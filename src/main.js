
// 設定をスプレッドシートから読み込む関数
function loadConfig() {
  try {
    // 設定スプレッドシートを検索
    const files = DriveApp.getFilesByName(CONFIG_SPREADSHEET_NAME);
    if (!files.hasNext()) {
      console.log('設定スプレッドシートが見つかりません。新規作成します。');
      createConfigSpreadsheet();
      throw new Error('設定スプレッドシートを作成しました。再度実行してください。');
    }
    
    const spreadsheet = SpreadsheetApp.openById(files.next().getId());
    
    // 基本設定の読み込み
    const basicSheet = spreadsheet.getSheetByName('基本設定');
    const basicData = basicSheet.getDataRange().getValues();
    
    // ヘッダー行をスキップして設定を読み込む
    for (let i = 1; i < basicData.length; i++) {
      const [key, value] = basicData[i];
      switch (key) {
        case '会社名':
          CONFIG.COMPANY_NAME = value;
          break;
        case 'Chat Webhook URL':
          CONFIG.CHAT_WEBHOOK_URL = value;
          break;
        case '応募管理シート名':
          CONFIG.SPREADSHEET_NAME = value;
          break;
        case '追加メッセージ':
          CONFIG.EXTRA_MESSAGE = value;
          break;
      }
    }
    
    // 求人サイト設定の読み込み
    const siteSheet = spreadsheet.getSheetByName('求人サイト設定');
    const siteData = siteSheet.getDataRange().getValues();
    
    CONFIG.EMAIL_CONFIGS = [];
    // ヘッダー行をスキップ
    for (let i = 1; i < siteData.length; i++) {
      const [name, email, keyword, startKeyword, endKeyword, loginaddress, password] = siteData[i];
      
      // 空行はスキップ
      if (!name || !email) continue;
      
      CONFIG.EMAIL_CONFIGS.push({
        name,
        email,
        keyword,
        startKeyword,
        endKeyword,
        loginaddress,
        password
      });
    }
    
    console.log('設定を読み込みました');
    console.log('会社名:', CONFIG.COMPANY_NAME);
    console.log('求人サイト数:', CONFIG.EMAIL_CONFIGS.length);
    
  } catch (error) {
    console.error('設定の読み込みエラー:', error);
    throw error;
  }
}

// スプレッドシートを取得または作成する関数
function getOrCreateSpreadsheet() {
  let spreadsheet;
  
  // まず既存のファイルを名前で検索
  const files = DriveApp.getFilesByName(CONFIG.SPREADSHEET_NAME);
  if (files.hasNext()) {
    const file = files.next();
    spreadsheet = SpreadsheetApp.openById(file.getId());
    console.log('既存のスプレッドシートを使用:', file.getId());
  } else {
    // 存在しない場合は新規作成
    spreadsheet = SpreadsheetApp.create(CONFIG.SPREADSHEET_NAME);
    const sheet = spreadsheet.getActiveSheet();
    
    // ヘッダーを設定
    sheet.getRange(1, 1, 1, 3).setValues([['タイムスタンプ', '会社名', '応募内容']]);
    sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    
    console.log('新しいスプレッドシートを作成:', spreadsheet.getId());
  }
  
  return spreadsheet;
}

function checkEmailsAndSendToChat() {
  // 設定を読み込む
  loadConfig();
  
  // スプレッドシートを取得または作成
  const spreadsheet = getOrCreateSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();

  CONFIG.EMAIL_CONFIGS.forEach(config => {
    const { email, keyword, startKeyword, endKeyword, loginaddress, password, name } = config;

    // Gmailから未読メールを検索
    const query = `from:${email} subject:${keyword} is:unread`;
    console.log(query);
    const threads = GmailApp.search(query);

    threads.forEach(thread => {
      const messages = thread.getMessages();
      messages.forEach(message => {
        // 未読メールのみ処理（念のためチェック）
        if (!message.isUnread()) {
          return;
        }

        const body = message.getPlainBody();

        // メール内容を処理
        const processedMessage = processApplication(body, startKeyword, endKeyword, loginaddress, password, name);

        // 処理結果がエラーの場合はスキップ
        if (processedMessage.includes("エラー発生")) {
            sendMessageToChat(processedMessage);
            message.markRead(); // エラーでも既読にする
            return;
        }

        // メッセージを既読にしてゴミ箱に移動
        message.markRead();
        message.moveToTrash();

        // COMPANY_NAME と一致するデータが既存スプレッドシートにある場合はスキップ
        if (isDuplicateRecord(sheet, CONFIG.COMPANY_NAME, processedMessage)) {
          console.log("重複した応募者を検出:",processedMessage);
          return;
        }

        // スプレッドシートに記録
        logToSpreadsheet(sheet, CONFIG.COMPANY_NAME, processedMessage);

        // Google Chat に送信
        console.log(processedMessage);
        sendMessageToChat(processedMessage);
      });
    });
  });
}

// メールを処理して応募情報を抽出
function processApplication(emailBody, startKeyword, endKeyword, loginAddress, password, name) {
  const startIndex = emailBody.indexOf(startKeyword);
  const endIndex = emailBody.indexOf(endKeyword, startIndex);

  if (startIndex === -1 || endIndex === -1) {
    return `エラー発生。気づいた人はメンションして岡田に報告してください。媒体が送る文章テンプレートが変更されていますので、切り取り条件を修正する必要があります。媒体: ${name}\n ${emailBody}`;
  }

  const actualStartIndex = startIndex + startKeyword.length;
  const processedContent = emailBody.slice(actualStartIndex, endIndex).trim();
  const loginInfo = `\n\n【ログイン情報】\nメールアドレス: ${loginAddress}\nパスワード: ${password}`;

  let actionWord = '応募';
  if (processedContent.includes('気になる')) {
    actionWord = '気になる';
  }

  const result = `${name}より${CONFIG.COMPANY_NAME}に${actionWord}がありました。\n\n${processedContent}${loginInfo} \n${CONFIG.EXTRA_MESSAGE}`;

  return result;
}

// スプレッドシートに応募情報を記録
function logToSpreadsheet(sheet, companyName, content) {
  const timestamp = new Date();
  sheet.appendRow([timestamp, companyName, content]);
}

// スプレッドシートに重複データがあるか確認
function isDuplicateRecord(sheet, companyName, content) {
  const data = sheet.getDataRange().getValues();

  // ヘッダー行をスキップ（i = 1から開始）
  for (let i = 1; i < data.length; i++) {
    const [_, recordedCompanyName, recordedContent] = data[i];
    if (recordedCompanyName === companyName && recordedContent === content) {
      return true; // 重複がある
    }
  }

  return false; // 重複がない
}

// Google Chatにメッセージを送信
function sendMessageToChat(body) {
  const payload = JSON.stringify({
    "text": body
  });

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: payload
  };

  try {
    UrlFetchApp.fetch(CONFIG.CHAT_WEBHOOK_URL, options);
  } catch (error) {
    console.error('Chat送信エラー:', error);
  }
}

// トリガーを作成
function createTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'checkEmailsAndSendToChat') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('checkEmailsAndSendToChat')
    .timeBased()
    .everyMinutes(1)
    .create();

  Logger.log('トリガーを作成しました。');
}

// 初回セットアップ用の関数
function setup() {
  // 設定スプレッドシートの確認・作成
  try {
    loadConfig();
  } catch (error) {
    console.log('初回セットアップ:', error.message);
    return;
  }
  
  // スプレッドシートを作成
  const spreadsheet = getOrCreateSpreadsheet();
  console.log('スプレッドシートID:', spreadsheet.getId());
  console.log('スプレッドシートURL:', spreadsheet.getUrl());
  
  // トリガーを作成
  createTrigger();
  
  // テスト実行
  checkEmailsAndSendToChat();
}

// 設定確認用の関数（手動実行用）
function checkConfig() {
  loadConfig();
  console.log('===== 現在の設定 =====');
  console.log('会社名:', CONFIG.COMPANY_NAME);
  console.log('Chat Webhook URL:', CONFIG.CHAT_WEBHOOK_URL);
  console.log('応募管理シート名:', CONFIG.SPREADSHEET_NAME);
  console.log('追加メッセージ:', CONFIG.EXTRA_MESSAGE);
  console.log('\n求人サイト設定:');
  CONFIG.EMAIL_CONFIGS.forEach((config, index) => {
    console.log(`${index + 1}. ${config.name} - ${config.email}`);
  });
}
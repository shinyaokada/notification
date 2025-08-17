

/* ここまでCONFIG　ここから共通 */

// スプレッドシートを取得または作成する関数
function getOrCreateSpreadsheet() {
  let spreadsheet;
  
  // まず既存のファイルを名前で検索
  const files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  if (files.hasNext()) {
    const file = files.next();
    spreadsheet = SpreadsheetApp.openById(file.getId());
    console.log('既存のスプレッドシートを使用:', file.getId());
  } else {
    // 存在しない場合は新規作成
    spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
    const sheet = spreadsheet.getActiveSheet();
    
    // ヘッダーを設定
    sheet.getRange(1, 1, 1, 3).setValues([['タイムスタンプ', '会社名', '応募内容']]);
    sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    
    console.log('新しいスプレッドシートを作成:', spreadsheet.getId());
  }
  
  return spreadsheet;
}

function checkEmailsAndSendToChat() {
  // スプレッドシートを取得または作成
  const spreadsheet = getOrCreateSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();

  EMAIL_CONFIGS.forEach(config => {
    const { email, keyword, startKeyword, endKeyword, loginaddress, password ,name } = config;

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
        if (isDuplicateRecord(sheet, COMPANY_NAME, processedMessage)) {
          console.log("重複した応募者を検出:",processedMessage);
          return;
        }

        // スプレッドシートに記録
        logToSpreadsheet(sheet, COMPANY_NAME, processedMessage);

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
    return `エラー発生。気づいた人はメンションして岡田に報告してください。媒体が送る文章テンプレートが変更されていますので、切り取り条件を修正する必要があります。媒体: ${name}`;
  }

  const actualStartIndex = startIndex + startKeyword.length;
  const processedContent = emailBody.slice(actualStartIndex, endIndex).trim();
  const loginInfo = `\n\n【ログイン情報】\nメールアドレス: ${loginAddress}\nパスワード: ${password}`;

  let actionWord = '応募';
  if (processedContent.includes('気になる')) {
    actionWord = '気になる';
  }

  const result = `${name}より${COMPANY_NAME}に${actionWord}がありました。\n\n${processedContent}${loginInfo} \n${EXTRA_MESSAGE}`;

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
    UrlFetchApp.fetch(CHAT_WEBHOOK_URL, options);
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
  // スプレッドシートを作成
  const spreadsheet = getOrCreateSpreadsheet();
  console.log('スプレッドシートID:', spreadsheet.getId());
  console.log('スプレッドシートURL:', spreadsheet.getUrl());
  
  // トリガーを作成
  createTrigger();
  
  // テスト実行
  checkEmailsAndSendToChat();
}
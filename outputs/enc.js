const COMPANY_NAME = 'エンジニアキャピタル'; // 会社名を定義

const EXTRA_MESSAGE = '面談者 堀江 \n 経験者: https://timerex.net/s/k.horie_848b/2725d29c \n 未経験者: https://timerex.net/s/y.matsumoto_9445_6a5c/c8c10013';

const EMAIL_CONFIGS = [
  {
    name : "マイナビ", 
    email: 'mt.customer@mynavi.jp',
    keyword: '応募受付' ,
    startKeyword: '・応募者への連絡は、応募管理システムMIWSの「応募管理」または「メッセージ」をご利用ください。',
    endKeyword: '応募データの詳細は、下記手順にてご確認ください。',
    loginaddress : 'jkd68',
    password : 'Attacktoma10!',
  },
  { 
    name : "type",
    email: 'noreply@notification.type.jp', 
    keyword: 'スカウトから話を聞きたい応募' ,
    startKeyword: '新しい「話を聞きたい応募」がありましたので、お知らせいたします。', 
    endKeyword: '応募者とのやり取りは「即レスポンス」が大切です。',
    loginaddress : 'hr221264',
    password : 'Mikatatp0',
  },
  { 
    name : "type",
    email: 'noreply@notification.type.jp', 
    keyword: '応募がありました' ,
    startKeyword: '新しい応募がありましたので、お知らせいたします。', 
    endKeyword: '応募者とのやり取りは「即レスポンス」が大切です。',
    loginaddress : 'hr221264',
    password : 'Mikatatp0',
  },
  { 
    name : "EN転職",
    email: 'support@employment.en-japan.com', 
    keyword: '新着応募のお知らせ' ,
    startKeyword: '下記URLより、応募者の詳細情報をご確認ください。', 
    endKeyword: '※ 応募者対応の早さは、貴社の採用活動を有利にします。',
    loginaddress:'ENS676786',
    password : 'attacktomato',
  },
  { 
    name : "エンゲージ",
    email: 'system@en-gage.net', 
    keyword: '新着応募のお知らせ' ,
    startKeyword: '下記URLより、応募内容をご確認の上、ご対応をお願いします。', 
    endKeyword: 'ご不明点は、',
    loginaddress:'ENS676786',
    password : 'attacktomato',
  },
  { 
    name : "doda",
    email: 'connect@doda.jp', 
    keyword: '応募通知' ,
    startKeyword: '窓口：doda窓口', 
    endKeyword: '--本件に関するお問い合わせ先---------------------',
    loginaddress:'saiyokanri@engineer-mikata.com',
    password : 'Mikatadoda0!',
  },
  { 
    name : "TypeDirect",
    email: 'cl-info@directtype.jp', 
    keyword: '新着の応募' ,
    startKeyword: '新着の応募またはメッセージが届いていますのでご確認お願いいたします。', 
    endKeyword: 'ＮＧの場合であっても、必ずご返信いただきますようお願い申し上げます。',
    loginaddress:'44446/saiyokanri@engineer-mikata.com',
    password : 'mikata315',
  },
  { 
    name : "TypeDirect",
    email: 'cl-info@directtype.jp', 
    keyword: '応募者対応のお願い' ,
    startKeyword: '引き続きご対応をお願いしたく、改めてご連絡を差し上げております。', 
    endKeyword: '-------------------------------------------------',
    loginaddress:'44446/saiyokanri@engineer-mikata.com',
    password : 'mikata315',
  },
  { 
    name : "EN転職",
    email: 'support@employment.en-japan.com', 
    keyword: '「気になる」' ,
    startKeyword: '人事ご担当者様', 
    endKeyword: '※気になる企業からの 『会ってみたい』 は、通常の５倍の反応率※',
    loginaddress:'ENS676786',
    password : 'attacktomato',
  },
];

const CHAT_WEBHOOK_URL = 'https://chat.googleapis.com/v1/spaces/AAQAPGN42f0/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=gSC3TX8WmPaEMFFSThREJkZqDXlvxAT6XYvh-ORNQhQ';

// スプレッドシート名（新規作成時に使用）
const SPREADSHEET_NAME = '求人応募管理シート';

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
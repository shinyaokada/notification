// 設定管理用スプレッドシートの名前
const CONFIG_SPREADSHEET_NAME = '求人応募管理システム設定';

// 設定を格納するグローバル変数
let CONFIG = {
  COMPANY_NAME: '',
  EXTRA_MESSAGE: '',
  CHAT_WEBHOOK_URL: '',
  SPREADSHEET_NAME: '',
  EMAIL_CONFIGS: []
};

// 設定スプレッドシートを初期作成する関数
function createConfigSpreadsheet() {
  const spreadsheet = SpreadsheetApp.create(CONFIG_SPREADSHEET_NAME);
  
  // 基本設定シートの作成
  const basicSheet = spreadsheet.getActiveSheet();
  basicSheet.setName('基本設定');
  
  // 基本設定のヘッダーとデフォルト値
  const basicData = [
    ['項目名', '値'],
    ['会社名', 'ケンブリッジコンサルティング'],
    ['Chat Webhook URL', 'https://chat.googleapis.com/v1/spaces/AAAAyJcGaP8/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=2HYAMZ1E2Vsk2TL8OKWCHpcxvuUn4qGEDDgIaXoRiS8'],
    ['応募管理シート名', '求人応募管理シート'],
    ['追加メッセージ', '面談者 畑下（佐藤凪義） \n 経験者: https://timerex.net/s/n.sato_9d5f_ee1c/3792cf6a \n 未経験者: https://timerex.net/s/y.matsumoto_9445_6a5c/ee9c2f8f']
  ];
  
  basicSheet.getRange(1, 1, basicData.length, 2).setValues(basicData);
  basicSheet.getRange(1, 1, 1, 2).setFontWeight('bold');
  basicSheet.autoResizeColumns(1, 2);
  
  // 求人サイト設定シートの作成
  const siteSheet = spreadsheet.insertSheet('求人サイト設定');
  
  // 求人サイト設定のヘッダー
  const siteHeaders = [
    ['サイト名', '送信元メール', '件名キーワード', '開始キーワード', '終了キーワード', 'ログインID', 'パスワード']
  ];
  
  // デフォルトの求人サイト設定
  const siteData = [
    ['マイナビ', 'mt.customer@mynavi.jp', '応募受付', '・応募者への連絡は、応募管理システムMIWSの「応募管理」または「メッセージ」をご利用ください。', '応募データの詳細は、下記手順にてご確認ください。', 'cbc8787', 'cc_114saiyo'],
    ['type', 'noreply@notification.type.jp', '応募がありました', '新しい応募がありましたので、お知らせいたします。', '応募者とのやり取りは「即レスポンス」が大切です。', 'hr223639', 'hrcc0303'],
    ['Direct type', 'cl-info@directtype.jp', '新着の応募', 'いつもお世話になっております。Direct type事務局です。', 'ＮＧの場合であっても、必ずご返信いただきますようお願い申し上げます。', '45704/s.wakabayashi@engineer-mikata.com', 'hrcc0417'],
    ['Direct type', 'cl-info@directtype.jp', '応募者対応のお願い', '引き続きご対応をお願いしたく、改めてご連絡を差し上げております。', '■ 管理画面のアカウントが未認証のご担当者様へ', '45704/s.wakabayashi@engineer-mikata.com', 'hrcc0417'],
    ['EN転職', 'support@employment.en-japan.com', '新着応募のお知らせ', '下記URLより、応募者の詳細情報をご確認ください。', '※ 応募者対応の早さは、貴社の採用活動を有利にします。', 'ENS793526', 'cc2412ses'],
    ['EN転職', 'support@employment.en-japan.com', '「気になる」', '人事ご担当者様', '※気になる企業からの 『会ってみたい』 は、通常の５倍の反応率※', 'ENS793526', 'cc2412ses'],
    ['エンゲージ', 'system@en-gage.net', '新着応募のお知らせ', '下記URLより、応募内容をご確認の上、ご対応をお願いします。', 'ご不明点は、', 'ENS793526', 'cc2412ses'],
    ['ヤギオファー', 'noreply_yagi@yagish.jp', 'オファーを送った求職者から承認されました', '<a href="', '">', 'hr@cambridgeconsulting.co.jp', 'sescc7878'],
    ['doda', 'connect@doda.jp', '応募通知', '窓口：doda窓口', '--本件に関するお問い合わせ先---------------------', 's.wakabayashi@engineer-mikata.com', 'Cc120_saiyo']
  ];
  
  const allData = [siteHeaders[0], ...siteData];
  siteSheet.getRange(1, 1, allData.length, 7).setValues(allData);
  siteSheet.getRange(1, 1, 1, 7).setFontWeight('bold');
  siteSheet.autoResizeColumns(1, 7);
  
  // 説明シートの作成
  const helpSheet = spreadsheet.insertSheet('使い方');
  const helpData = [
    ['求人応募管理システム 設定ガイド'],
    [''],
    ['■ 基本設定シート'],
    ['・会社名: 応募を受け付ける会社名を設定します'],
    ['・Chat Webhook URL: Google Chatの通知先URLを設定します'],
    ['・応募管理シート名: 応募データを保存するスプレッドシートの名前を設定します'],
    ['・追加メッセージ: 通知に追加するメッセージ（面談者情報など）を設定します'],
    [''],
    ['■ 求人サイト設定シート'],
    ['・各求人サイトの設定を行います'],
    ['・行を追加することで新しい求人サイトを追加できます'],
    ['・不要な行は削除してください'],
    [''],
    ['■ 注意事項'],
    ['・設定変更後は、必ず「設定を再読み込み」してください'],
    ['・パスワードは慎重に管理してください'],
    ['・開始/終了キーワードは正確に入力してください']
  ];
  
  helpSheet.getRange(1, 1, helpData.length, 1).setValues(helpData.map(text => [text]));
  helpSheet.getRange(1, 1).setFontSize(14).setFontWeight('bold');
  
  console.log('設定スプレッドシートを作成しました:', spreadsheet.getUrl());
  return spreadsheet;
}
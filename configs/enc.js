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
const COMPANY_NAME = 'カンゲンエージェント'; // 会社名を定義

const EXTRA_MESSAGE = '面談者 伊藤 \n 経験者: https://timerex.net/s/t.ito_336d_9fda/9457b718 \n 未経験者: https://timerex.net/s/y.matsumoto_9445_6a5c/64e12192';

const EMAIL_CONFIGS = [
  {
    name : "マイナビ", 
    email: 'mt.customer@mynavi.jp',
    keyword: '応募受付' ,
    startKeyword: '・応募者への連絡は、応募管理システムMIWSの「応募管理」または「メッセージ」をご利用ください。',
    endKeyword: '応募データの詳細は、下記手順にてご確認ください。',
    loginaddress : 'rto28',
    password : 'Kangen0201',
  },
  { 
    name : "type",
    email: 'noreply@notification.type.jp', 
    keyword: '応募がありました' ,
    startKeyword: '新しい応募がありましたので、お知らせいたします。', 
    endKeyword: '応募者とのやり取りは「即レスポンス」が大切です。',
    loginaddress : 'hr224636',
    password : 'kangen0201',
  },
  { 
    name : 'Direct type',
    email: 'cl-info@directtype.jp', 
    keyword: '新着の応募' ,
    startKeyword: 'いつもお世話になっております。Direct type事務局です。', 
    endKeyword: 'ＮＧの場合であっても、必ずご返信いただきますようお願い申し上げます。',
    loginaddress : '46210/recruit@kangen-agent.com',
    password : 'kangen0201',
  },
  { 
    name : 'Direct type',
    email: 'cl-info@directtype.jp', 
    keyword: '応募者対応のお願い' ,
    startKeyword: '引き続きご対応をお願いしたく、改めてご連絡を差し上げております。', 
    endKeyword: '■ 管理画面のアカウントが未認証のご担当者様へ',
    loginaddress : '46210/recruit@kangen-agent.com',
    password : 'kangen0201',
  },
  { 
    name : "EN転職",
    email: 'support@employment.en-japan.com', 
    keyword: '新着応募のお知らせ' ,
    startKeyword: '下記URLより、応募者の詳細情報をご確認ください。', 
    endKeyword: '※ 応募者対応の早さは、貴社の採用活動を有利にします。',
    loginaddress:'ENS795462',
    password : 'kangen0201',
  },
  { 
    name : "EN転職",
    email: 'support@employment.en-japan.com', 
    keyword: '「気になる」' ,
    startKeyword: '人事ご担当者様', 
    endKeyword: '※気になる企業からの 『会ってみたい』 は、通常の５倍の反応率※',
    loginaddress:'ENS795462',
    password : 'kangen0201',
  },
  { 
    name : "エンゲージ",
    email: 'noreply@en-gage.net', 
    keyword: '新着応募のお知らせ' ,
    startKeyword: '下記URLより、応募内容をご確認の上、ご対応をお願いします。', 
    endKeyword: 'ご不明点は、',
    loginaddress:'recruit@kangen-agent.com',
    password : 'kangen0201',
  },
  { 
    name : "doda",
    email: 'connect@doda.jp', 
    keyword: '応募通知' ,
    startKeyword: '窓口：doda窓口', 
    endKeyword: '--本件に関するお問い合わせ先---------------------',
    loginaddress:'t.ito@engineer-mikata.com',
    password : 'Kangen-agent0201',
  },

];

const CHAT_WEBHOOK_URL = 'https://chat.googleapis.com/v1/spaces/AAAAl2Im7dA/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=vieMWELY5alQA4D5E2poBOLVajy2HKMiptDEVXwxaUo';

// スプレッドシート名（新規作成時に使用）
const SPREADSHEET_NAME = '求人応募管理シート';
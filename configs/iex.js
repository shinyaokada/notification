const COMPANY_NAME = 'ITエグゼクティブ'; // 会社名を定義

const EXTRA_MESSAGE = '面談者 菅原 \n 経験者: https://timerex.net/s/s.sugawara_a190_55c2/49acf46f \n 未経験者: https://timerex.net/s/y.matsumoto_9445_6a5c/b5d57bfc';

const skipSenders = ['cl-info@directtype.jp']; // 処理をスキップする差出人のリスト

const EMAIL_CONFIGS = [
  {
    name : "マイナビ", 
    email: 'mt.customer@mynavi.jp',
    keyword: '応募受付' ,
    startKeyword: '・応募者への連絡は、応募管理システムMIWSの「応募管理」または「メッセージ」をご利用ください。',
    endKeyword: '応募データの詳細は、下記手順にてご確認ください。',
    loginaddress : 'wvy81',
    password : 'ITexecutive@',
  },
  { 
    name : "type",
    email: 'noreply@notification.type.jp', 
    keyword: '応募がありました' ,
    startKeyword: '新しい応募がありましたので、お知らせいたします。', 
    endKeyword: '応募者とのやり取りは「即レスポンス」が大切です。',
    loginaddress : '',
    password : '',
  },
  { 
    name : "EN転職",
    email: 'support@employment.en-japan.com', 
    keyword: '新着応募のお知らせ' ,
    startKeyword: '下記URLより、応募者の詳細情報をご確認ください。', 
    endKeyword: '※ 応募者対応の早さは、貴社の採用活動を有利にします。',
    loginaddress:'ENS491540',
    password : 'ITexecutive@',
  },
  { 
    name : "EN転職",
    email: 'support@employment.en-japan.com', 
    keyword: '「気になる」' ,
    startKeyword: '人事ご担当者様', 
    endKeyword: '※気になる企業からの 『会ってみたい』 は、通常の５倍の反応率※',
    loginaddress:'ENS491540',
    password : 'ITexecutive@',
  },
  { 
    name : "エンゲージ",
    email: 'system@en-gage.net', 
    keyword: '新着応募のお知らせ' ,
    startKeyword: '下記URLより、応募内容をご確認の上、ご対応をお願いします。', 
    endKeyword: 'ご不明点は、',
    loginaddress:'',
    password : '',
  },
  { 
    name : "doda",
    email: 'connect@doda.jp', 
    keyword: '応募通知' ,
    startKeyword: '窓口：doda窓口', 
    endKeyword: '--本件に関するお問い合わせ先---------------------',
    loginaddress:'iida@engineer-mikata.com',
    password : 'ITexecutive@1',
  },
  { 
    name : "TypeDirect",
    email: 'cl-info@directtype.jp', 
    keyword: '新着の応募' ,
    startKeyword: '新着の応募またはメッセージが届いていますのでご確認お願いいたします。', 
    endKeyword: 'ＮＧの場合であっても、必ずご返信いただきますようお願い申し上げます。',
    loginaddress:'46751/recruit@it-executive.jp',
    password : 'ITexecutive@',
  },
  { 
    name : "TypeDirect",
    email: 'cl-info@directtype.jp', 
    keyword: '応募者対応のお願い' ,
    startKeyword: '引き続きご対応をお願いしたく、改めてご連絡を差し上げております。', 
    endKeyword: '※ログインができないなどご不明点がございましたら、',
    loginaddress:'46751/recruit@it-executive.jp',
    password : 'ITexecutive@',
  },
];

const CHAT_WEBHOOK_URL = 'https://chat.googleapis.com/v1/spaces/AAQABMbBZsM/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=e6jq978AJFyP0ugDamtLonYVo3gQDnk2pYPDpzyVipY';

// スプレッドシート名（新規作成時に使用）
const SPREADSHEET_NAME = '求人応募管理シート';
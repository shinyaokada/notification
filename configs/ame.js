const COMPANY_NAME = 'AIメタバース'; // 会社名を定義

const EXTRA_MESSAGE = '面談者:カンゲン&EFチーム \n 経験者: https://timerex.net/s/t.ito_336d_9fda/20abba8b \n 未経験者: https://timerex.net/s/y.matsumoto_9445_6a5c/80d340a1';

const EMAIL_CONFIGS = [
  {
    name : "マイナビ", 
    email: 'mt.customer@mynavi.jp',
    keyword: '応募受付' ,
    startKeyword: '・応募者への連絡は、応募管理システムMIWSの「応募管理」または「メッセージ」をご利用ください。',
    endKeyword: '応募データの詳細は、下記手順にてご確認ください。',
    loginaddress : 'dga66',
    password : 'AImetaverse@',
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
    loginaddress:'ENS669427',
    password : 'AImetaverse@2',
  },
  { 
    name : "EN転職",
    email: 'support@employment.en-japan.com', 
    keyword: '「気になる」' ,
    startKeyword: '人事ご担当者様', 
    endKeyword: '※気になる企業からの 『会ってみたい』 は、通常の５倍の反応率※',
    loginaddress:'ENS669427',
    password : 'AImetaverse@2',
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
    loginaddress:'recruit@ai-metaverse.jp',
    password : 'AImetaverse@1',
  },
  { 
    name : "TypeDirect",
    email: 'cl-info@directtype.jp', 
    keyword: '新着の応募' ,
    startKeyword: '新着の応募またはメッセージが届いていますのでご確認お願いいたします。', 
    endKeyword: 'ＮＧの場合であっても、必ずご返信いただきますようお願い申し上げます。',
    loginaddress:'46750/recruit@ai-metaverse.jp',
    password : 'AImetaverse@',
  },
  { 
    name : "TypeDirect",
    email: 'cl-info@directtype.jp', 
    keyword: '応募者対応のお願い' ,
    startKeyword: '引き続きご対応をお願いしたく、改めてご連絡を差し上げております。', 
    endKeyword: '※ログインができないなどご不明点がございましたら、',
    loginaddress:'46750/recruit@ai-metaverse.jp',
    password : 'AImetaverse@',
  },
];

const CHAT_WEBHOOK_URL = 'https://chat.googleapis.com/v1/spaces/AAQALk4O9Cw/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=99zolQoNt6nfpnjnXWOXfA7iBvzRQAFT6jBI_IVu7ww';

// スプレッドシート名（新規作成時に使用）
const SPREADSHEET_NAME = '求人応募管理シート';
const COMPANY_NAME = 'エンジニアファースト'; // 会社名を定義

const EXTRA_MESSAGE = '面談者 飯田 \n 経験者: https://timerex.net/s/iida_99c3_540d/8744216d \n 未経験者: https://timerex.net/s/y.matsumoto_9445_6a5c/a80de76a';

const EMAIL_CONFIGS = [
  { 
    name : 'マイナビ',
    email: 'mt.customer@mynavi.jp',
    keyword: '応募受付' ,
    startKeyword: '・応募者への連絡は、応募管理システムMIWSの「応募管理」または「メッセージ」をご利用ください。',
    endKeyword: '応募データの詳細は、下記手順にてご確認ください。',
    loginaddress : 'xdu34',
    password : 'first0125*',
  },
  { 
    name : 'type',
    email: 'noreply@notification.type.jp', 
    keyword: '応募がありました' ,
    startKeyword: '新しい応募がありましたので、お知らせいたします。', 
    endKeyword: '応募者とのやり取りは「即レスポンス」が大切です。',
    loginaddress : 'hr221965',
    password : 'ef3333ses',
  },
  { 
    name : 'Direct type',
    email: 'cl-info@directtype.jp', 
    keyword: '新着の応募' ,
    startKeyword: 'いつもお世話になっております。Direct type事務局です。', 
    endKeyword: 'ＮＧの場合であっても、必ずご返信いただきますようお願い申し上げます。',
    loginaddress : '44887/recruit@engineer-first.co.jp',
    password : 'ef3333ses',
  },
  { 
    name : 'Direct type',
    email: 'cl-info@directtype.jp', 
    keyword: '応募者対応のお願い' ,
    startKeyword: '引き続きご対応をお願いしたく、改めてご連絡を差し上げております。', 
    endKeyword: '-------------------------------------------------',
    loginaddress : '44887/recruit@engineer-first.co.jp',
    password : 'ef3333ses',
  },
  { 
    name : 'EN転職',
    email: 'support@employment.en-japan.com', 
    keyword: '新着応募のお知らせ' ,
    startKeyword: '下記URLより、応募者の詳細情報をご確認ください。', 
    endKeyword: '※ 応募者対応の早さは、貴社の採用活動を有利にします。',
    loginaddress:'ENS961169',
    password : 'dx8888ses',
  },
  { 
    name : "EN転職",
    email: 'support@employment.en-japan.com', 
    keyword: '「気になる」' ,
    startKeyword: '人事ご担当者様', 
    endKeyword: '※気になる企業からの 『会ってみたい』 は、通常の５倍の反応率※',
    loginaddress:'ENS961169',
    password : 'dx8888ses',
  },
  { 
    name : "エンゲージ",
    email: 'system@en-gage.net', 
    keyword: '新着応募のお知らせ' ,
    startKeyword: '下記URLより、応募内容をご確認の上、ご対応をお願いします。', 
    endKeyword: 'ご不明点は、',
    loginaddress:'ENS961169',
    password : 'dx8888ses',
  },
  {
    name : "ヤギオファー",
    email: 'noreply_yagi@yagish.jp',
    keyword: 'オファーを送った',
    startKeyword: 'オファーを送った求職者',
    endKeyword: '詳細へ',
    loginaddress:'データなし',
    password : 'データなし',
  },
  { 
    name : "エンゲージ",
    email: 'noreply@en-gage.net', 
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
    loginaddress:'',
    password : '',
  },
];

const CHAT_WEBHOOK_URL = 'https://chat.googleapis.com/v1/spaces/AAAAkJ8aoxk/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=XZhh1uo_Olo9pm_EdxnjXuNfRBHVpc4ChTBngiFj2Qc';

// スプレッドシート名（新規作成時に使用）
const SPREADSHEET_NAME = '求人応募管理シート';
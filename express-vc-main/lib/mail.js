import nodemailer from 'nodemailer'
import { serverConfig } from '../config/server.config.js'
import { isDev } from './utils.js'

// 取得config檔案中的smtp設定
const { host, user, pass, provider } = serverConfig.smtp

// 使用gmail寄送
const gmail = {
  host,
  port: 465,
  secure: true, // use TLS
  //在專案的 .env 檔案中定義關於寄送郵件的 process.env 變數
  auth: {
    user,
    pass,
  },
  tls: {
    servername: 'smtp.gmail.com',
    rejectUnauthorized: false,
  },
}

// 使用 https://ethereal.email/
const ethereal = {
  host,
  port: 587,
  auth: {
    user,
    pass,
  },
}

// 定義所有email的寄送伺服器位置
const transport = provider === 'gmail' ? gmail : ethereal

const otpMailHtml = (otpToken, secret) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>重設網站登入密碼要求的一次性驗証碼 OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f6f6f6;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: black;
            padding: 20px;
            text-align: center;
        }
        img{
              margin: 10px 10px -5px 10px;
        }
        .header img {
            max-width: 150px;
            height: fit-content;
        }
        .header div{
            color: #ffffff;
            font-size: 24px;
            font-weight: bold;
        }
        span {
            color: #ffffff;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
                <img src="https://i.imgur.com/YgnRq4G.png" alt="Echora" width="30"> 
                <div style="display:inline-block;" >Echora • 拾光</div>
            <h1 style="color: #ffffff;">重設登入密碼的一次性驗証碼(OTP)</h1>
        </div>
        <div class="content">
            <p>親愛的Echora會員 您好，</p>
            <p>您的一次性驗証碼(OTP code)如下:</p>
            <div class="otp-code">${otpToken}</div>
            <p><a href="${serverConfig.nextUrl}/my-user/forget-password-2p/reset?secret=${secret}" target="_blank">請由此連結進入重設登入密碼頁面</a></p>
            <p>請注意驗証碼將於寄送後5分鐘後到期，如有任何問題請洽網站客服人員。</p>
        </div>
        <div class="footer">
            <p>&copy; Echora 拾光</p>
        </div>
    </div>

</body>
</html>
`

// 電子郵件文字訊息樣版
const otpMailText = (otpToken, secret) => `親愛的網站會員 您好，
通知重設密碼所需要的驗証碼，
請輸入以下的6位數字，重設密碼頁面的"電子郵件驗証碼"欄位中。
    
${otpToken}

或是點選以下連結:

<http://localhost:3000/user/forget-password-2p/reset?secret=${secret}>
    
請注意驗証碼將於寄送後5分鐘後到期，如有任何問題請洽網站客服人員:

敬上

Echora 拾光`

// 測試用一般寄送
export const sendOtpMail = async (to, otpToken, secret = '') => {
  if (isDev) console.log(otpToken)
  // 寄送email
  const mailOptions = {
    // 這裡要改寄送人
    from: user, // sender address
    to: to, // list of receivers
    subject: '重設登入密碼的一次性驗証碼(OTP)',
    text: otpMailText(otpToken, secret),
    html: otpMailHtml(otpToken, secret),
  }

  // 呼叫transport函式
  const transporter = nodemailer.createTransport(transport)

  // 寄送email
  try {
    const info = await transporter.sendMail(mailOptions)
    if (isDev) console.log('Message sent: ', info.messageId)
  } catch (err) {
    console.log(err)
    throw new Error('無法寄送email')
  }
}

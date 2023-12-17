// services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: 'smtpout.secureserver.net', // GoDaddy SMTP server
    port: 465, // GoDaddy SMTP port
    // secure: true,
    secureConnection: true,
    tls: {
        ciphers: 'SSLv3'
    },
    requireTLS: true,
    debug: true,
    auth: {
        user: "avi@digielevation.com", // Replace with your Gmail email address
        pass: "Qwerty=@123", // Replace with your Gmail email password
    },
});


// var email_smtp = nodemailer.createTransport({      
//     host: "smtp.gmail.com",
//     auth: {
//       type: "OAuth2",
//       user: "youremail@gmail.com",
//       clientId: "CLIENT_ID_HERE",
//       clientSecret: "CLIENT_SECRET_HERE",
//       refreshToken: "REFRESH_TOKEN_HERE"                              
//     }
//   });

const sendThankYouEmail = async (toEmail) => {
    const mailOptions = {
        from: process.env.GODADDY_EMAIL,
        to: toEmail,
        subject: 'Thank You for Contacting Us',
        html: `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            max-width: 600px;
            width: 100%;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
            text-align: center;
        }

        p {
            color: #666;
            text-align: center;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 40px;
        }
    </style>
    <title>Thank You for Contacting Digielevation!</title>
</head>

<body>
    <div class="container">
        <h1>Thank You for Contacting Digielevation!</h1>
        <p>We appreciate your interest and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Digielevation Team</p>
        <a href="https://digielevation.com" class="button">Visit Digielevation</a>
    </div>
</body>

</html>`,
    };

    await transporter.sendMail(mailOptions);
};

const sendOwnerNotificationEmail = async (toEmail, formData) => {
    const { name, email, phoneNumber, message } = formData;

    const mailOptions = {
        from: process.env.GODADDY_EMAIL,
        to: toEmail,
        subject: 'New Contact Form Submission',
        html: `
            <body>
                <p>Dear Admin,</p>
                <p>You have received a new contact form submission:</p>
                <ul>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Phone:</strong> ${phoneNumber}</li>
                    <li><strong>Message:</strong> ${message}</li>
                </ul>
                <p>Best regards,</p>
                <p>Digielevation</p>
            </body>
        </ >
    `,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendThankYouEmail,
    sendOwnerNotificationEmail,
};

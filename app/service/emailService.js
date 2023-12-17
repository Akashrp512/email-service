// services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Godaddy',
    host: 'smtpout.secureserver.net', // GoDaddy SMTP server
    port: 465, // GoDaddy SMTP port
    // secure: true,
    secureConnection: true,
    // tls: {
    //     ciphers: 'SSLv3'
    // },
    // requireTLS: true,
    // debug: true,
    auth: {
        user: process.env.GODADDY_EMAIL, // Replace with your Gmail email address
        pass: process.env.GODADDY_PASSWORD, // Replace with your Gmail email password
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
        text: 'Thank you for submitting the contact form. We will get back to you soon!',
    };

    await transporter.sendMail(mailOptions);
};

const sendOwnerNotificationEmail = async (toEmail, formData) => {
    const { name, email, phoneNumber, message } = formData;

    const mailOptions = {
        from: process.env.GODADDY_EMAIL,
        to: toEmail,
        subject: 'New Contact Form Submission',
        text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendThankYouEmail,
    sendOwnerNotificationEmail,
};

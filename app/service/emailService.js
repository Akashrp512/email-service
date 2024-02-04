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
        user: "sales@digielevation.com", // Replace with your Gmail email address
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
              margin: 0;
              font-family: 'Helvetica Neue', Arial, sans-serif;
            }
        
            header {
              padding: 1rem;
              color: #fff;
              background-color: #2ecc71;
              /* Green color for the digital marketing agency */
            }
        
            main {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 3rem 1rem;
            }
        
            .rounded-full {
              border-radius: 9999px;
            }
        
            .bg-muted {
              background-color: #d3d3d3;
            }
        
            .border {
              border: 1px solid #000;
            }
        
            footer {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 1rem;
              background-color: #f5f5f5;
            }
        
            .text-xs {
              font-size: 0.75rem;
            }
        
            .text-gray-500 {
              color: #888;
            }
        
            .hover\:underline:hover {
              text-decoration: underline;
            }
        
            .focus-visible\:ring-ring:focus-visible {
              outline: 2px auto #2ecc71;
              /* Green color for the focus ring */
            }
        
            .focus-visible\:ring-offset-2:focus-visible {
              outline-offset: 2px;
            }
        
            .disabled\:pointer-events-none {
              pointer-events: none;
            }
        
            .disabled\:opacity-50 {
              opacity: 0.5;
            }
          </style>
        </head>
        
        <body>
        
          <header>
            <h1 class="text-2xl font-bold">Thank You for Choosing Our Digital Marketing Services!</h1>
          </header>
        
          <main>
            <span class="relative flex shrink-0 overflow-hidden rounded-full h-24 w-24 mb-4">
              <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                <img src="https://digielevation.com/assets/images/favicon32x32.png"  >
              </span>
              <!-- Replace "DM" with your digital marketing agency logo or initials -->
            </span>
            <h2 class="text-xl font-semibold mb-2">Dear Valued Client,</h2>
            <p class="text-md text-gray-800 mb-6">
              We want to express our gratitude for choosing our digital marketing services. Your trust means the world to us.
            </p>
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm mb-6 max-w-md mx-auto">
              <div class="flex flex-col space-y-1.5 p-6 px-4 py-2">
                <h3 class="text-lg font-semibold">About Our Digital Marketing Solutions</h3>
              </div>
              <div class="p-6 px-4 py-2">
                <p class="text-sm text-gray-600 mb-2">
                  Our dedicated team is committed to helping your business thrive in the digital landscape. We look forward to
                  delivering exceptional results and growing your online presence.
                </p>
                <img src="https://digielevation.com/assets/images/digielevation-logo.png" width="100%" height="100%"
                  alt="Digital Marketing Image"
                  class="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center mb-2">
                <button
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">Learn
                  more</button>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-6">
              We are excited to embark on this journey with you and contribute to your digital success.
            </p>
            <button
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Explore
              Our Services</button>
          </main>
        
          <footer>
            <p class="text-sm text-gray-500">© 2023 Digielevation. All rights reserved.</p>
          </footer>
        
        </body>
        
        </html>`,
    };

    await transporter.sendMail(mailOptions);
};

const sendOwnerNotificationEmail = async (toEmails, formData) => {
    const { name, email, phoneNumber, message } = formData;

    const mailOptions = {
        from: process.env.GODADDY_EMAIL,
        to: toEmails.join(', '),
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

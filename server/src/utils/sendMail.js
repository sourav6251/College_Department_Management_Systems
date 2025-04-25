// import nodeMailer from 'nodemailer';

// export const sendEmail = async (receiver, subject, message) => {
//     console.log(process.env.MAIL_HOST);
//     try {
//         const transporter = nodeMailer.createTransport({
//             host: process.env.MAIL_HOST ,
//             port: process.env.MAIL_PORT,
//             service: process.env.MAIL_SERVICE,
//             secure: false,
//             auth: {
//                 user: process.env.MAIL_NAME,
//                 pass: process.env.MAIL_PASS,
//             },
//         });

//         const htmlContent = `
//             <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <style>
//                     body {
//                         font-family: 'Roboto', sans-serif;
//                         margin: 0;
//                         padding: 0;
//                         background-color: #f4f7fc;
//                         overflow: hidden; /* Prevents body scroll */
//                     }
//                     .container {
//                         width: 100vw;
//                         max-width: 600px;
//                         margin: 0 auto;
//                         background: #ffffff;
//                         padding: 30px;
//                         border-radius: 10px;
//                         box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//                         overflow: hidden; /* Prevents container scroll */
//                     }
//                     .header {
//                         background-color: #3b4d68;
//                         color: white;
//                         text-align: center;
//                         padding: 20px;
//                         border-radius: 10px 10px 0 0;
//                     }
//                     .header h1 {
//                         font-size: 28px;
//                         margin: 0;
//                         font-weight: 700;
//                     }
//                     .content {
//                         padding: 25px;
//                         color: #333333;
//                         line-height: 1.6;
//                     }
//                     .content p {
//                         font-size: 16px;
//                         color: #5a5a5a;
//                     }
//                     .cta-button {
//                         background-color: #38a169;
//                         color: white;
//                         padding: 12px 25px;
//                         text-decoration: none;
//                         border-radius: 5px;
//                         font-weight: 600;
//                         display: inline-block;
//                     }
//                     .cta-button:hover {
//                         background-color: #2f7f5e;
//                     }
//                     .footer {
//                         text-align: center;
//                         color: #aaa;
//                         font-size: 14px;
//                         padding-top: 20px;
//                         border-top: 1px solid #e6e6e6;
//                     }
//                     .footer a {
//                         color: #38a169;
//                         text-decoration: none;
//                     }
//                     .footer p {
//                         margin-top: 10px;
//                     }
//                     .footer a:hover {
//                         text-decoration: underline;
//                     }
//                 </style>
//             </head>
//             <body>
//                 <div class="container">
//                     <div class="header">
//                         <h1>Welcome to CodeCanvas!</h1>
//                     </div>
//                     <div class="content">
//                         <p>Dear User,</p>
//                         <p>We are excited to have you join CodeCanvas! Here's a quick introduction to help you get started:</p>
//                         <p>${message}</p>
//                         <div style="text-align: center; margin-top: 30px;">
//                             <a href="https://www.codecanvas.com" class="cta-button">Visit CodeCanvas</a>
//                         </div>
//                     </div>
//                     <div class="footer">
//                         <p>Follow us on social media:</p>
//                         <p>
//                             <a href="https://www.facebook.com/CodeCanvas" target="_blank">Facebook</a> |
//                             <a href="https://www.twitter.com/CodeCanvas" target="_blank">Twitter</a> |
//                             <a href="https://www.instagram.com/CodeCanvas" target="_blank">Instagram</a>
//                         </p>
//                         <p>&copy; ${new Date().getFullYear()} CodeCanvas. All rights reserved.</p>
//                     </div>
//                 </div>
//             </body>
//             </html>
//         `;

//         const mailOptions = {
//             from: `CodeCanvas <${process.env.MAIL_NAME}>`,
//             to: receiver,
//             subject: subject,
//             html: htmlContent,
//         };

//         await transporter.sendMail(mailOptions);
//         console.info("Email sent successfully");
//     } catch (error) {
//         console.error("Email not sent", error);
//     }
// };


import nodeMailer from 'nodemailer';

export const sendEmail = async (receiver, subject, message) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            service: process.env.MAIL_SERVICE,
            secure: false,
            auth: {
                user: process.env.MAIL_NAME,
                pass: process.env.MAIL_PASS,
            },
        });

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: #f9f9fb;
                }
                .email-wrapper {
                    max-width: 600px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    background: linear-gradient(to right, #00b4db, #0083b0);
                    color: #ffffff;
                    text-align: center;
                    padding: 30px 20px;
                }
                .email-header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
                }
                .email-body {
                    padding: 30px 25px;
                    color: #333333;
                }
                .email-body h2 {
                    font-size: 22px;
                    margin-bottom: 10px;
                    color: #007acc;
                }
                .email-body p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #555;
                }
                .cta {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 12px 24px;
                    background: #00b894;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: 600;
                    transition: background 0.3s ease;
                }
                .cta:hover {
                    background: #009e7a;
                }
                .email-footer {
                    text-align: center;
                    font-size: 14px;
                    color: #aaa;
                    padding: 20px;
                    background: #f0f0f0;
                }
                .email-footer a {
                    color: #00b894;
                    text-decoration: none;
                }
                .email-footer a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="email-wrapper">
                <div class="email-header">
                    <h1>Welcome to PBC-Online</h1>
                    <p style="margin-top: 10px;">Empowering Teachers, Students, and Education</p>
                </div>
                <div class="email-body">
                    <h2>Hello!</h2>
                    <p>${message}</p>
                    <div style="text-align: center;">
                        <a href="https://www.pbc-online.com" class="cta">Explore PBC-Online</a>
                    </div>
                </div>
                <div class="email-footer">
                    <p>Stay connected:</p>
                    <p>
                        <a href="https://www.facebook.com/PBCOnline" target="_blank">Facebook</a> |
                        <a href="https://www.twitter.com/PBCOnline" target="_blank">Twitter</a> |
                        <a href="https://www.instagram.com/PBCOnline" target="_blank">Instagram</a>
                    </p>
                    <p>&copy; ${new Date().getFullYear()} PBC-Online. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: `PBC-Online <${process.env.MAIL_NAME}>`,
            to: receiver,
            subject: subject,
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
        console.info("Attractive email sent successfully");
    } catch (error) {
        console.error("Email sending failed", error);
    }
};

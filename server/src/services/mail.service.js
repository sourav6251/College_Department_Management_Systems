import mailConfiguration from "../config/mail.configuration.js";

class MailService {
    sendMail = async (To,subject,text) => {
      console.log("Enter into Mail=> ",To);
      
        await mailConfiguration.sendMail({
            from: process.env.EMAIL_ID,
            to:To,
            subject: subject,
            text: text,
        });
    };
    
    meetingMail = async (Tos, subject,body) => {
      console.log("meetingMail=> ");
      
        await mailConfiguration.sendMail({
          from: process.env.EMAIL_ID,
          bcc: Tos,
          subject: subject,
          text: body,
        });
      };


    //   certificateMail = async (To, subject,htmlContent) => {
    //     try {
          
    //         // Generate PDF from HTML
    //         const pdfBuffer = await html2pdf()
    //             .from(htmlContent)
    //             .set({
    //                 margin: 10,
    //                 filename: 'certificate.pdf',
    //                 image: { type: 'jpeg', quality: 0.98 },
    //                 html2canvas: { scale: 2 },
    //                 jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    //             })
    //             .output('arraybuffer');

    //         // Send email with attachment
    //         await mailConfiguration.sendMail({
    //             from: process.env.EMAIL_ID,
    //             to: To,
    //             subject: subject,
    //             html: `
    //                 <p>Please find your certificate attached.</p>
    //                 <p>You can also view it online:</p>
    //                 <div>${htmlContent}</div>
    //             `,
    //             attachments: [{
    //                 filename: 'certificate.pdf',
    //                 content: pdfBuffer,
    //                 contentType: 'application/pdf'
    //             }]
    //         });

    //         return { success: true };
    //     } catch (error) {
    //         console.error("Certificate mail error:", error);
    //         return { success: false, message: error.message };
    //     }
    // }
      
}
export default new MailService();

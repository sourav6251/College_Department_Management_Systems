import mailConfiguration from "../config/mail.configuration.js";

class MailService {
    sendMail = async (To) => {
      console.log("Enter into Mail=> ",To);
      
        await mailConfiguration.sendMail({
            from: process.env.EMAIL_ID,
            to:To,
            subject: "Hello",
            text: "Test mail",
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
      
}
export default new MailService();

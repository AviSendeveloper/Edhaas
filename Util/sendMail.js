const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.googlemail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

const sendMail = async ({ toEmail, subject, body }) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.MAIL_FORM,
            to: toEmail,
            subject: subject,
            html: body,
        });

        console.log("Mail send successfully. MessageId: ", info.messageId);
        // return info;
    } catch (error) {
        console.log("Nodemailer Error: ", error);
    }
};

module.exports = sendMail;

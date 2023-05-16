import {createTransport} from "nodemailer";
import {Session} from "next-auth";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const transport: SMTPTransport.Options = {
    host: process.env.EMAIL_HOST!,
    port: parseInt(process.env.EMAIL_PORT!),
    secure: process.env.EMAIL_USE_SSL === "true",
    auth: {
        user: process.env.EMAIL_USERNAME!,
        pass: process.env.EMAIL_PASSWORD!,
    },
    from: `Cyber Security <${process.env.EMAIL_USERNAME}>`,
}

const transporter = createTransport(transport);
export default class Email {
    public static async sendMail(props: {subject: string, content: string, to: string}) {
        await transporter.sendMail({
            to: props.to,
            subject: props.subject,
            text: props.subject,
            from: `Cyber Security <${process.env.EMAIL_USERNAME}>`,
        });
    }
}
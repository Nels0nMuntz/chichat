import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ErrorCode, ErrorException } from '../shared';


export class MailService {

    private transporter: Transporter<SMTPTransport.SentMessageInfo> ;

    public initTransporter = () => {       
        this.transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 0,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }

    public sendActivationMail = async (email: string, link: string) => {
        try {
            const response = await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: "Активация аккаунта на " + process.env.API_URL,
                text: "",
                html: `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
            });
        } catch (error) {
            console.log({ message: "Can not send confirmation email", error });
            throw new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, "Can not send confirmation email");
        }
    }
}

export const mailService = new MailService();
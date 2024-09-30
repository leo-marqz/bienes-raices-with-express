import nodemailer from 'nodemailer';

async function sendAccountConfirmationEmail(info){
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const {email, name, token} = info;

    await transport.sendMail({
        from: 'bienesraices.com',
        to: email,
        subject: 'Confirma tu cuenta en bienesraices.com',
        text: `Hola ${name}, por favor confirma tu cuenta en bienesraices.com `,
        html: `
                <div style="font-family: Arial, sans-serif; text-align: center; color: #333; margin-top:20px;">
                    <h1>Hola ${name},</h1>
                    <p>Gracias por registrarte en <strong>bienesraices.com</strong>.</p>
                    <p>Por favor, confirma tu cuenta haciendo clic en el siguiente botón:</p>
                    <a href="${process.env.APP_URL_BASE}:${process.env.APP_PORT_BASE ?? 3000}/auth/confirm-account/${token}" 
                    style="
                        display: inline-block;
                        padding: 15px 25px;
                        margin: 20px 0;
                        font-size: 16px;
                        color: #ffffff;
                        background-color: #28a745;
                        text-decoration: none;
                        border-radius: 5px;
                    ">
                    Confirmar Cuenta
                    </a>
                    <p style="color: #777;">Si no creaste esta cuenta, puedes ignorar este correo.</p>
                    <p>Saludos,<br/>El equipo de bienesraices.com</p>
                </div>
            `
    });
}

export {
    sendAccountConfirmationEmail
}
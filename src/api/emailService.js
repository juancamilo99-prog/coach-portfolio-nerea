import { Resend } from "resend";

const resendKey = process.env.RESEND_KEY;
const backendUrl = process.env.BACKEND_URL;
const resend = new Resend(resendKey);


export const sendConfirmationEmail = async (email, token) => {
    
    const confirmUrl = `${backendUrl}/api/newsletter/confirm?token=${token}`;
    
    const { error: errorConfirmationEmail } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirma tu suscripción a la newsletter',
        html: `<p>Confirma tu <strong>Suscripción</strong>!</p> <a href="${confirmUrl}">Confirmar</a>`
    });

    return errorConfirmationEmail;
}
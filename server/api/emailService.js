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

export const sendNewsletterEmails = async (subscribers, subject, html) => {
    const emails = subscribers.map((subscriber) => {

        const tokenSusbcriptor = subscriber.token;
        const unsubscribeUrl = `${backendUrl}/api/newsletter/unsubscribe?token=${tokenSusbcriptor}`;

        return {
            from: 'onboarding@resend.dev',
            to: subscriber.email,
            subject: subject,
            html: `
            ${html}
            <hr />
            <p style="font-size: 12px; color: #888;">
                ¿No quieres recibir más correos? <a href="${unsubscribeUrl}">Date de baja aquí.</a>
            </p>
            `
        };
    });

    const { data: dataSendNewsletter, error: errorDataSendNewsletter } = await resend.batch.send(emails);

    return errorDataSendNewsletter;
}
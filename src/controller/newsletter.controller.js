import crypto from 'node:crypto';
import { sendConfirmationEmail } from "../api/emailService.js";
import { supabaseAdmin } from "../api/supabaseAdmin.js";

export const subscribeEmail = async (req, res) => {

    try{
        const { email, consent } = req.body;
        //si el email esta vacio
        if(!email){
            return res.status(400).json({ error: "Email no puede ir vacio."});
        }

        //formato email
        const cleanEmail = email.trim().toLowerCase();
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);
        if(!emailValido){
            return res.status(400).json({ error: "El formato del email no es valido."});
        }

        //si no ha dado su consentimiento
        if(consent !== true){
            return res.status(400).json({ error: "Debes aceptar la politica de privacidad para suscribirte."})
        }

        const { data: subscriber , error: errorSubscriber } = await supabaseAdmin.from('suscriptores').select('email, estado').eq('email', cleanEmail).maybeSingle();

        if(errorSubscriber){
            return res.status(500).json({ error: "Error al obtener el email y estado del suscriptor."})
        }

        if(!subscriber){
            const tokenEmail = crypto.randomUUID();
            const { error: errorTokenSuscriptor } = await supabaseAdmin.from('suscriptores').insert({
                email: cleanEmail,
                token: tokenEmail
            });

            if(errorTokenSuscriptor){
                return res.status(500).json({ error: "Error al guardar los datos token y email."})
            }

            const errorEnvio = await sendConfirmationEmail(cleanEmail, tokenEmail);

            if(errorEnvio){
                return res.status(500).json({ error: "Error al obtener la confirmacion del email."});
            }
        }

        return res.status(200).json({ message: "Revisa tu correo para confirmar tu suscripción."});

    }catch(error){
        return res.status(500).json({ error: "Error al obtener la subscripcion"});
    }
}
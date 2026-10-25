import crypto from "node:crypto";
import { sendConfirmationEmail } from "../api/emailService.js";
import { supabaseAdmin } from "../api/supabaseAdmin.js";

const frontedUrl = process.env.FRONTEND_URL;

export const subscribeEmail = async (req, res) => {
  try {
    const { email, consent } = req.body;
    //si el email esta vacio
    if (!email) {
      return res.status(400).json({ error: "Email no puede ir vacio." });
    }

    //formato email
    const cleanEmail = email.trim().toLowerCase();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);
    if (!emailValido) {
      return res
        .status(400)
        .json({ error: "El formato del email no es valido." });
    }

    //si no ha dado su consentimiento
    if (consent !== true) {
      return res
        .status(400)
        .json({
          error: "Debes aceptar la politica de privacidad para suscribirte.",
        });
    }

    const { data: subscriber, error: errorSubscriber } = await supabaseAdmin
      .from("suscriptores")
      .select("email, estado")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (errorSubscriber) {
      return res
        .status(500)
        .json({ error: "Error al obtener el email y estado del suscriptor." });
    }

    if (!subscriber) {
      const tokenEmail = crypto.randomUUID();
      const { error: errorTokenSuscriptor } = await supabaseAdmin
        .from("suscriptores")
        .insert({
          email: cleanEmail,
          token: tokenEmail,
        });

      if (errorTokenSuscriptor) {
        return res
          .status(500)
          .json({ error: "Error al guardar los datos token y email." });
      }

      const errorEnvio = await sendConfirmationEmail(cleanEmail, tokenEmail);

      if (errorEnvio) {
        return res
          .status(500)
          .json({ error: "Error al obtener la confirmacion del email." });
      }
    } else if (
      subscriber.estado === "pendiente" ||
      subscriber.estado === "baja"
    ) {
      const newToken = crypto.randomUUID();
      const { error: errorEstado } = await supabaseAdmin
        .from("suscriptores")
        .update({ estado: "pendiente", fecha_baja: null, token: newToken, fecha_alta: new Date().toISOString() })
        .eq("email", cleanEmail);
      if (errorEstado) {
        return res.status(500).json({ error: "Error al actualizar el estado" });
      }
      const errorEnvio = await sendConfirmationEmail(cleanEmail, newToken);
      if (errorEnvio) {
        return res
          .status(500)
          .json({ error: "Error al obtener la confirmacion del email." });
      }
    }
    return res
      .status(200)
      .json({ message: "Revisa tu correo para confirmar tu suscripción." });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener la subscripcion" });
  }
};

export const confirm = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.redirect(`${frontedUrl}/?newsletter=error`);
    }

    const { data: datoConfirmado, error: errorConfirmado } = await supabaseAdmin
      .from("suscriptores")
      .select("estado")
      .eq("token", token)
      .maybeSingle();

    if (errorConfirmado) {
      return res.redirect(`${frontedUrl}/?newsletter=error`);
    }

    if (!datoConfirmado) {
      return res.redirect(`${frontedUrl}/?newsletter=invalido`);
    }

    if (datoConfirmado.estado === "baja") {
      return res.redirect(`${frontedUrl}/?newsletter=invalido`);
    } else if (datoConfirmado.estado === "pendiente") {
      const { error: errorUpdate } = await supabaseAdmin
        .from("suscriptores")
        .update({
          estado: "confirmado",
          fecha_confirmacion: new Date().toISOString(),
        })
        .eq("token", token);
      if (errorUpdate) {
        return res.redirect(`${frontedUrl}/?newsletter=error`);
      }
    }
    return res.redirect(`${frontedUrl}/?newsletter=confirmada`);
  } catch (error) {
    return res.redirect(`${frontedUrl}/?newsletter=error`);
  }
};

export const unsubscribe = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.redirect(`${frontedUrl}/?newsletter=error`);
    }

    const { data: datoSuscripcion, error: errorSuscripcion } =
      await supabaseAdmin
        .from("suscriptores")
        .select("estado")
        .eq("token", token)
        .maybeSingle();

    if (errorSuscripcion) {
      return res.redirect(`${frontedUrl}/?newsletter=error`);
    }

    if (!datoSuscripcion) {
      return res.redirect(`${frontedUrl}/?newsletter=invalido`);
    }

    if (datoSuscripcion.estado !== "baja") {
      const { error: errorUpdateDescripcion } = await supabaseAdmin
        .from("suscriptores")
        .update({ estado: "baja", fecha_baja: new Date().toISOString() })
        .eq("token", token);
      if (errorUpdateDescripcion) {
        return res.redirect(`${frontedUrl}/?newsletter=error`);
      }
    }
    return res.redirect(`${frontedUrl}/?newsletter=baja`);
  } catch (error) {
    return res.redirect(`${frontedUrl}/?newsletter=error`);
  }
};

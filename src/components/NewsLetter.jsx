import React, { useState } from "react";
import { useForm } from "react-hook-form";

const urlBackendVite = import.meta.env.VITE_BACKEND_URL;

const NewsLetter = () => {
  const { register, handleSubmit, reset, formState: { errors},} = useForm({ defaultValues: { email: "", consent: false}});
  const [ status, setStatus ] = useState(null);

    const onSubmit = async(data) => {
        try{
            console.log(data);
        const response = await fetch(`${urlBackendVite}/api/newsletter/subscribe`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        });

        const respuestaSubmit = await response.json();
        if(!response.ok){
            return setStatus({
                type: 'error',
                text: respuestaSubmit.error
            });
        }
        reset();
        return setStatus({
            type: 'success',
            text: respuestaSubmit.message
        });
        }catch(error){
            return setStatus({
            type: 'error',
            text: 'No se pudo conectar, intentalo mas tarde.'
        });
        }
    }

  return (
    <div>
      <div
        className="border p-10 rounded-2xl"
        style={{ background: "linear-gradient(135deg, #1A0A2E, #2D1060)" }}
      >
        <div className="flex flex-col items-center">
          <span className="text-4xl mb-4">📬</span>
          <h3 className="font-display font-black text-3xl text-white md:text-4xl mb-4">
            Newsletter
            <em className="gradient-text not-italic">semanal</em>
          </h3>
          <p className="text-white mb-8 max-w-lg mx-auto font-light">
            Recibe inspiración, tips de emprendimiento, novedades Farmasi y
            contenido exclusivo cada semana directamente en tu correo.
          </p>
          <form
          onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto"
          >
            <div className="flex gap-3 mb-3 items-center">
              <input
                type="email"
                id="email"
                placeholder="tu@correo.com"
                className="flex-1 px-5 py-3.5 rounded-full text-ink font-medium"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "2px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                }}
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", { required: "El email es requerido"})}
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full font-black text-ink transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
                style={{ background: "#FFD60A" }}
              >
                Suscribirme
              </button>
            </div>
            <div className="flex gap-4 items-center justify-center py-3">
              <input id="consent" type="checkbox" className="border"
              aria-invalid={errors.consent ? "true" : "false"}
              {...register("consent", { required: "Debes aceptar y leer el consentimiento."})} />
              <label htmlFor="consent" className="text-white">*Aceptar la <a href="/privacy" target="_blank" >política de privacidad</a></label>
            </div>
            {errors.consent && <p role="alert" className="text-red-500 text-center">{errors.consent.message}</p>}
            {errors.email && <p role="alert" className="text-red-500 text-center">{errors.email.message}</p>}
          </form>
          {status && (
            <p role="alert" className={status.type === 'success' ? `text-green-500` : `text-red-500`}>
                {status.text}
            </p>
          )};
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;

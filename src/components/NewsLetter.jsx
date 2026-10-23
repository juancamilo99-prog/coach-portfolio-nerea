import React, { useState } from 'react'

const NewsLetter = () => {

    const [subscribed, setSubscribed] = useState(false);

  return (
    <div>
        <div className="border p-10 rounded-2xl" style={{ background: "linear-gradient(135deg, #1A0A2E, #2D1060)"}}>
            <div className="flex flex-col items-center">
                <span className="text-4xl mb-4">📬</span>
                <h3 className="font-display font-black text-3xl text-white md:text-4xl mb-4">Newsletter 
                    <em className="gradient-text not-italic">semanal</em>
                </h3>
                <p className="text-white mb-8 max-w-lg mx-auto font-light">Recibe inspiración, tips de emprendimiento, novedades Farmasi y contenido exclusivo cada semana directamente en tu correo.</p>
                <form action="" method="post" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input type="email" placeholder="tu@correo.com" className="flex-1 px-5 py-3.5 rounded-full text-ink font-medium"
                     style={{ background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.2)", color: "#fff" }}/>
                    <button type="submit" 
                    className="px-7 py-3.5 rounded-full font-black text-ink transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
                    style={{ background: "#FFD60A"}}
                    >Suscribirme</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default NewsLetter
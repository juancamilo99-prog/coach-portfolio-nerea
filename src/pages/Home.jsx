import React from 'react'

export function Home() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center justify-center w-full py-10">
        {/* cinta de titulo inicio */}
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="border border-amber-300 rounded-full py-1 px-3 bg-amber-300">
          <span className="text-sm font-bold tracking-widest uppercase">Coach · Autora · Emprendedora</span>
        </div>
        {/* mensaje titulo */}
        <div className="font-display leading-tight">
          <span className="hero-title-1 block text-5xl md:text-7xl font-black">Transforma tu</span>
          <span className="hero-title-2 block text-5xl md:text-7xl font-black italic gradient-text">vida y negocio</span>
        </div>
        {/* descripcion hero */}
        <span className="hero-sub text-lg md:text-xl font-light leading-relaxed max-w-lg text-center">Soy <strong className="font-bold">Nerea Sánchez</strong> - coach de vida, escritora, lectora y distribuidora oficial de 
          Farmasi. Te acompaño a despertar tu potencial y crear el negocio y la vida que mereces.
        </span>
        {/* botones */}
        <div className="flex flex-nowrap gap-5">
          <a href="" className="py-2 px-6 rounded-full text-white font-bold text-base 
          transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95" 
          style={{ background: "linear-gradient(135deg, #FF2D78 0%, #FF6B35 100%)", boxShadow: "0 8px 32px rgba(255,45,120,0.35)" }}>Ver Servicios</a>
          <a href="" className="border-2 border-[#7C3AED] py-2 px-6 rounded-full font-bold text-base
          transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95" style={{ color: "#7C3AED" }}>Mis Libros</a>
        </div>
        {/* clientes, libros y experiencia */}
        <div className="flex gap-10">
          <div className="hero-stat flex flex-col items-center">
            <span className="text-4xl gradient-text font-display font-black">500+</span>
            <span className="text-sm font-medium mt-1">Clientes</span>
          </div>
          <div className="hero-stat flex flex-col items-center">
            <span className="text-4xl gradient-text font-display font-black">3</span>
            <span className="text-sm font-medium mt-1">Libros</span>
          </div>
          <div className="hero-stat flex flex-col items-center">
            <span className="text-4xl gradient-text font-display font-black">8 años</span>
            <span className="text-sm font-medium mt-1">Experiencia</span>
          </div>
        </div>
        </div>
        {/* imagen del hero */}
          <div className="relative rounded-3xl overflow-hidden row-span-1" style={{ boxShadow: "20px 20px 0px #FFD60A, 40px 40px 0px rgba(255,45,120,0.2)" }}>
            <img src="https://images.unsplash.com/photo-1563132337-f159f484226c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
             alt="Nerea Guisado, coach y emprendedora"
             className="w-full object-cover" style={{ height: "540px", background: "#FFE0F0"}}/>
             <div className="absolute inset-0"  style={{ background: "linear-gradient(to top, rgba(26,10,46,0.4) 0%, transparent 50%)" }}/>
          </div>
      </div>
    </section>
  )
}

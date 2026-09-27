import React from 'react'
import { SERVICES } from '../data/services';

export function Services (){
  return (
    <section className="bg-cream py-15 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="section-reveal text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
          style={{ background: "#FFE0F0", color: "#FF2D78" }}>Lo que ofrezco</span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-ink leading-tight">Servicios que
            <br />
            <em className="gradient-text-violet not-italic">transforman</em>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          { SERVICES.map((servicio) => (
            <div key={servicio.title} className="service-card group rounded-2xl p-8 cursor-pointer transition-all duration-300
            hover:-translate-y-2 hover:shadow-2xl" style={{ background: servicio.bg, borderLeft:`4px solid ${servicio.color}` }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300
              group-hover:scale-110 group-hover:rotate-6"
              style={{ background: `${servicio.color}22`}}>
                {servicio.icon}
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-ink">{servicio.title}</h3>
              <p className="text-sm leading-relaxed">{servicio.desc}</p>
              <div className="mt-5 flex items-center gap-2 font-bold text-sm" style={{ color: servicio.color }}>
                Saber mas
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

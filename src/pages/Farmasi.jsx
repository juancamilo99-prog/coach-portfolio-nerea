import React from 'react'
import { VideoGallery } from '../components/VideoGallery';

const FAVORITOS_FARMASI = [
  { icon: "💋", label: "Maquillaje", description: "Mi Maquillaje Favorito" },
  { icon: "🌿", label: "Skincare", description: "Mis Productos Naturales Favoritos" },
  { icon: "🌸", label: "Perfumeria", description: "Mis Perfumes Favoritos" },
  { icon: "💪", label: "Bienestar", description: "Mis Suplementos Deportivos Favoritos" }
];

export function Farmasi() {
  return (
    <section className="px-6 py-15">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <span className="font-bold inline-block rounded-full py-1 px-4 text-xs tracking-widest uppercase mb-4" style={{ background: "#FFD60A"}}>Distribuidora Oficial</span>
          <h2 className="font-display font-black text-4xl md:text-6xl leading-tight">
            Descubre el mundo
            <br />
            <span className="gradient-text not-italic">Farmasi</span>
          </h2>
          <span className="m-6 inline-block text-start">
            Farmasi es una empresa global de belleza y bienestar que combina calidad premium con precios accesibles. 
            Como distribuidora oficial, te ofrezco los mejores productos y la oportunidad de generar ingresos desde casa.
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {FAVORITOS_FARMASI.map((favoritos => (
            <div key={favoritos.label} className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "#FFF0F5" }}>
              <span className="text-2xl">{favoritos.icon}</span>
              <div>
                <div className="font-bold text-sm">{favoritos.label}</div>
                <div className="text-xs" style={{ color: "#6B5080"}}>{favoritos.description}</div>
              </div>
            </div>
          )))}          
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="" className="gradient-button px-8 py-3.5 rounded-full font-bold text-white transition-all duration-300
          hover:scale-105">Ver Catalogo Completo</a>
          <a href="" className="px-8 py-3.5 font-bold border-2 rounded-full border-amber-600 text-amber-600
          transition-all duration-300 hover:scale-105">Ser Distribuidora</a>
        </div>
        <VideoGallery />
      </div>
    </section>
  )
}

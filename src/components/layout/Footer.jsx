import React from 'react'
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/services", label: "Servicios" },
  { to: "/projects", label: "Proyectos" },
  { to: "/farmasi", label: "Farmasi" },
  { to: "/contact", label: "Contacto" },
];

export function Footer () {
  return (
    <>
      <div className="max-w-7xl mx-auto flex flex-col items-start justify-center py-4 px-4 md:grid md:grid-cols-3
      md:justify-items-center">
      {/* mensaje y titulo */}
      <div>
        <h2 className="font-display text-3xl font-bold mb-3" style={{ color: "#FF2D78" }}>Nerea</h2>
        <span className="text-sm leading-relaxed max-w-xs">Coach de vida, autora y distribuidora oficial Farmasi. Acompañando mujeres
          a crear la vida que merecen.
        </span>
      </div>
      { /* Navegacion */}
      <div>
        <h3 className="font-bold" style={{ color: "#FF2D78" }}>NAVEGACIÓN</h3>
        <nav className="flex flex-col gap-2 py-3 font-semibold text-sm">
          {
            navItems.map((item) => (
              <NavLink key={item.to}
              to={item.to}
              end={item.to === '/'}>
                <span>{item.label}</span>
              </NavLink>
            ))
          }
        </nav>
      </div>
      {/* Contacto */}
      <div className="flex flex-col gap-2">
        <h3 className="font-bold" style={{ color: "#FF2D78" }}>CONTACTO</h3>
        <span className="text-sm font-semibold">nereaguisadosanchez@gmail.com</span>
        <span className="text-sm font-semibold">+34 611 234 123</span>
        <span className="text-sm font-semibold">Valencia, España</span>
      </div>
    </div>
    <div className="border border-border w-full"></div>
      <div className="flex flex-col items-center mx-auto py-2">
        <p className="text-sm">
          © 2026 Nerea Sanchez, Todos los derechos reservados.
        </p>
        <p className="text-sm">
          Hecho con 💖 y muchas energias
        </p>
      </div>
    </>
  )
}

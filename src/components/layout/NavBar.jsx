import React, { useState } from 'react'
import { X, Menu } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

const navItems = [
    { to: '/', label: 'Inicio' },
    { to: '/services', label: 'Servicios'},
    { to: '/projects', label: 'Proyectos'},
    { to: '/farmasi', label: 'Farmasi'},
    { to: '/contact', label: 'Contacto'}
]

export function NavBar () {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-40 border-b" style={{ backdropFilter: "blur(12px)"}}>
        {/* titulo top nav */}
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate("/")} className="flex gap-1 shrink-0">
            <span className="font-display font-bold text-2xl" style={{ color: "#FF2D78"}}>NEREA</span>
          </button>
          <nav className="hidden md:flex items-center gap-3 flex-1">
          {navItems.map((item) => (
            <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}>
              <span className="relative">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* boton de hamburguesa, visible solo para mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={24}/> : <Menu size={24} />}
        </button>
        </div>
        { isOpen && (
          <nav className="md:hidden flex flex-col border-t border-border px-4 py-3 gap-1">
            {navItems.map((item) => (
              <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setIsOpen(false)}>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        )}
      </header>
    </div>
  )
}

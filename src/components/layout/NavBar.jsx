import React, { useState } from "react";
import { X, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/services", label: "Servicios" },
  { to: "/projects", label: "Proyectos" },
  { to: "/farmasi", label: "Farmasi" },
  { to: "/contact", label: "Contacto" },
];

export function NavBar() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-cream w-full py-3 sticky md:border-b border-[#ff2d78]" >
      <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between px-4 py-3">
        <button onClick={() => navigate('/')}>
          <span className="font-display font-bold text-3xl leading-none" style={{ color: "#FF2D78"}}>NEREA</span>
        </button>
        <nav className="hidden md:flex gap-6 transition-all duration-300">
          {navItems.map((items) => (
            <NavLink key={items.to} to={items.to} end={items.to === "/"}>
              <span className="font-bold">{items.label}</span>
            </NavLink>
          ))}
        </nav>
        {/* boton de hamburguesa */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden ml-auto">
          { isOpen ? <X size={24} color="#FF2D78"/> : <Menu size={24} color="#FF2D78"/>}
        </button>
      </div>

      {/* panel para mostrar el menu al presional boton hamburguesa */}
      {isOpen && (
        <nav className="md:hidden flex flex-col border-t border-[#ff2d78] px-4 py-3 gap-1">
          {navItems.map((items) => (
            <NavLink key={items.to} to={items.to} end={items.to === "/"}>
              <span className="font-bold">{items.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

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
    <header className="w-full py-3 px-3">
      <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between">
        <button onClick={() => navigate('/')}>
          <span className="font-display font-bold text-3xl leading-none" style={{ color: "#FF2D78"}}>NEREA</span>
        </button>
        <nav className="hidden md:flex gap-6">
          {navItems.map((items) => (
            <NavLink key={items.to} to={items.to} end={items.to === "/"}>
              <span>{items.label}</span>
            </NavLink>
          ))}
        </nav>
        {/* boton de hamburguesa */}
        <button>
          { isOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>
    </header>
  );
}

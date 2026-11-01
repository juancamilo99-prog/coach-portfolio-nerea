
const DATOS = [
  {icon: "📧", title: "Email", content: "nereguisadosanchez@gmail.com", color: "#FF2D78"},
  {icon: "📱", title: "Whastapp", content: "+34 604141948", color: "#00C9B1"},
  {icon: "📍", title: "Ubicación", content: "Valencia, España", color: "#7C3AED" },
  
]


export function Contact () {
  return (
    <section className="px-6 py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* seccion de saltos */}
        <div className="section-reveal">
          <span className="inline-block tracking-widest border rounded-full px-4 py-1.5 mb-4 text-sm"
          style={{ background: "#FFE0F0", color: "#FF2D78" }}>Hablemos</span>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-6 leading-tight">¿Lista para
            <br />
            <span className="gradient-text">dar el salto?</span>
          </h1>
          <p className="text-lg leading-relaxed mb-8">Escríbeme y con gusto conversamos sobre cómo puedo acompañarte en tu proceso de crecimiento
            personal, emprendimiento o para unirte al mundo Farmasi.
          </p>
          <div className="space-y-5">
            { DATOS.map((dato) => (
              <div key={dato.title} className="flex items-center gap-3 border px-3 py-3 rounded-2xl p-4"
              style={{ background: "#fff", border: `1px solid ${dato.color}22`}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${dato.color}15`}}>
                  <span>{dato.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: dato.color }}>{dato.title}</span>
                  <span className="font-semibold">{dato.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* seccion formulario */}
        <div className="section-reveal">
            <form action="" className="rounded-3xl p-8 md:p-10 space-y-5"
            style={{ background: "#fff", boxShadow: "0 24px 80px rgba(255,45,120,0.08)", border: "1px solid rgba(255,45,120,0.1)" }}>
              <div className="flex flex-col gap-5">
                <label htmlFor="" className="block text-sm font-bold mb-2">Tu nombre</label>
                <input type="text" placeholder="Escribe tu nombre"
                className="w-full px-5 py-3.5 rounded-2xl font-medium transition-all duration-200"
                style={{ background: "#F8F5FF", border: "2px solid #EDE8FF" }} />
                <label htmlFor="" className="block text-sm font-bold mb-2">Correo electronico</label>
                <input type="email" placeholder="tucorreo@correo.com" 
                className="w-full px-5 py-3.5 rounded-2xl font-medium transition-all duration-200"
                 style={{ background: "#F8F5FF", border: "2px solid #EDE8FF" }} />
                <label htmlFor="" className="block text-sm font-bold mb-2">Mensaje</label>
                <textarea name="" id="" placeholder="Cuéntame sobre ti y cómo puedo ayudarte..."
                className="w-full px-5 py-3.5 rounded-2xl font-medium transition-all duration-200 resize-none"
                style={{ background: "#F8F5FF", border: "2px solid #EDE8FF" }}></textarea>
              </div>
              <button className="w-full py-4 rounded-2xl font-black text-white text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-98"
              style={{ background: "linear-gradient(135deg, #FF2D78 0%, #7C3AED 100%)", boxShadow: "0 8px 32px rgba(255,45,120,0.35)" }}>
                Enviar mensaje
              </button>
            </form>
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import { BOOKS } from '../data/books';

export function Projects () {
  return (
    <section className="bg-ink py-15 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="section-reveal text-center mb-16">
          <span className="text-rose bg-rose inline-block rounded-full py-1 px-4 text-xs font-bold tracking-widest uppercase mb-4" style={{ background: "#FF2D7820"}}>MIS CREACIONES</span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-cream leading-tight">libros que
            <br />
            <em className="gradient-text not-italic">inspiran vidas</em>
          </h2>
        </div>
        {/* CARDS de libros */}
        <div className="grid md:grid-cols-3 gap-8">
          {BOOKS.map((book, i) =>(
            <div key={book.title}
            className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-400
            hover:-translate-y-4" style={{ background: `0 20px 60px ${book.color}40`}}>
              <div className="relative h-80 overflow-hidden" style={{ background: book.color }}>
                <img src={book.img} alt={book.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80
                group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, ${book.color} 100%)`}}>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black" style={{ background: book.accent }}>
                    {book.year}
                  </div>
                </div>
              </div>
              <div className="p-6" style={{ background: `linear-gradient(135deg, ${book.color}33, #1A0A2E)`}}>
                <h3 className="font-display font-black text-xl text-cream mb-2 leading-tight">{book.title}</h3>
                <p className="text-sm mb-4 text-white">{book.subtitle}</p>
                <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white">{book.pages}</span>
                <button className="px-3 py-1 rounded-full text-xs font-black" style={{ background: book.accent}}>
                  Conseguir
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

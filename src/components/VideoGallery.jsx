import { useEffect, useRef, useState } from 'react'
import { supabase  } from '../utils/supabase';
import { Timer, Play, ThumbsUp, MessageCircle, ChevronRight, ChevronLeft } from 'lucide-react';

export const VideoGallery = () => {

    const [videos, setVideos] = useState([]);
    const [categoria, setCategoria] = useState('Todos los videos');
    const [loading, setLoading] = useState(true);
    const carouselRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const CATEGORIES = [
        'Todos los videos'
    ];

    useEffect(() => {
        fetchVideos();
    }, [categoria])

    const fetchVideos = async () => {

        setLoading(true);

        let query = supabase.from('videos').select('*').order('created_at', { ascending: false });

        if(categoria !== 'Todos los videos'){
            const cleanCategoria = categoria.replace(/^[^\w\s]+/, '').trim();
            query = query.eq('categoria', cleanCategoria);
        }

        const { data, error } = await query;
        if(error) console.log(error);
        else setVideos (data || []);
        setLoading(false);
    }

    const formatNumber = (num) => {
        if(!num) return '0';
        if (num >= 1000000) return(num/1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    const filteredVideos = videos;

    const scroll = (direccion) => {
        const cantidad = direccion === 'left' ? -300 : 300;
        carouselRef.current.scrollBy({ left: cantidad, behavior: 'smooth'});
    }

    const checkScroll = () => {
        if(!carouselRef.current) return;
        const {scrollLeft, clientWidth, scrollWidth} = carouselRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth -1);
    }

    useEffect(() => {
        checkScroll();
    }, [videos]);

  return (
    <div className="mt-10">
        <div>
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                    <button key={cat}
                    onClick={() => setCategoria(cat)}
                    className={`px-4 py-2 text-xs font-semibold transition-all border rounded-full 
                    ${categoria === cat ? 'bg-[#00f2fe] text-black border-[#00f2fe]' 
                    : 'bg-[#1a1a22] text-zinc-400 border-white/10 hover:bg-[#262632] hover:text-white'}`}>
                        {cat} {cat === 'Todos los videos' && `(${ videos.length })`}
                    </button>
                ))}
            </div>
            {/* grid videos */}
            <div className="px-3 py-5">
                {loading ? (
                    <div>Cargando catalogo...</div>
                ): filteredVideos.length === 0 ? (
                    <div> No se encontraron videos </div>
                ) : (
                    <div>
                        <div ref={carouselRef} onScroll={checkScroll} className="no-scrollbar flex overflow-x-auto gap-10 snap-x snap-mandatoryp">
                        {filteredVideos.map((video) => (
                            <a href={video.tiktok_url}
                            key={video.id}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative shrink-0 w-60 snap-start">
                                <img src={video.cover_url} alt={video.title} className="aspect-9/16 w-full object-cover"/>
                                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
                                {/* header de la tarjeta */}
                                <div className="font-display absolute bottom-0 w-full p-3 text-white/80 text-sm font-bold flex gap-5">
                                    <span className="flex gap-1"><Timer size={14}/> {video.duration}</span>
                                {/* cuerpo y metricas */}
                                    <span className="flex gap-1"><Play size={14}/>{formatNumber(video.views_count)}</span>
                                    {/* footer de la tarjeta */}
                                    <span className="flex gap-1"><ThumbsUp size={14}/>{formatNumber(video.likes_count)}</span>
                                    <span className="flex gap-1"><MessageCircle size={14}/>{formatNumber(video.comments_count)}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button className="border-2 py-2 px-2 rounded-full cursor-pointer transition-all hover:opacity-40 disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={!canScrollLeft} onClick={() => scroll('left')}><ChevronLeft/></button>
                        <button className="border-2 py-2 px-2 rounded-full cursor-pointer transition-all hover:opacity-40 disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={!canScrollRight} onClick={() => scroll('right')}><ChevronRight/></button>
                    </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

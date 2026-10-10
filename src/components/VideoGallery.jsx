import { useEffect, useState } from 'react'
import { supabase  } from '../utils/supabase';

export const VideoGallery = () => {

    const [videos, setVideos] = useState([]);
    const [categoria, setCategoria] = useState('Todos los videos');
    const [loading, setLoading] = useState(true);

    const CATEGORIES = [
        'Todos los videos',
        'Farmasi'
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

    const filteredVideos = videos.filter((video) => 
        video.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        video.tag?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            <div>
                {loading ? (
                    <div>Cargando catalogo...</div>
                ): filteredVideos.length === 0 ? (
                    <div> No se encontraron videos </div>
                ) : (
                    <div>
                        {filteredVideos.map((video) => (
                            <a href="video.tiktok.url"
                            key={video.id}
                            target="_blank"
                            rel="noopener noreferrer">
                                <img src={video.cover_url} alt={video.title} />
                                <div></div>
                                {/* header de la tarjeta */}
                                <div>
                                    <span>{video.tag}</span>
                                    <span>⏱ {video.duration}</span>
                                </div>
                                {/* cuerpo y metricas */}
                                <div>
                                    <div>▶ {formatNumber(video.views_count)}</div>
                                    <h3>{video.title}</h3>
                                    <p>{video.subtitle}</p>
                                    {/* footer de la tarjeta */}
                                    <div>
                                        <div>
                                            <span>{formatNumber(video.likes_count)}</span>
                                            <span>{formatNumber(video.comments_count)}</span>
                                        </div>
                                        <span>↪</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

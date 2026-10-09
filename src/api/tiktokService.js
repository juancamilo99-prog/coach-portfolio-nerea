import { supabase } from "../utils/supabase";

export async function handler() {
    try{

        const response = await fetch(
            'https://open.tiktokapis.com/v2/video/list/?fields=id,title,cover_image_url,share_url,video_description,duration,like_count,comment_count,view_count',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.TIKTOK_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ max_count: 20 }),

            }
        );

        const data = await response.json();
        const tiktokVideos = data.data?.videos || [];

        //mapeamos y guardamos los datos en supabase
        for(const video of tiktokVideos){
            await supabase.from('videos').upsert(
                {
                    tiktok_id: video.id,
                    title: video.title || 'Sin titulo',
                    subtitle: video.video_description || '',
                    category: 'Farmasi',
                    tag: 'Distribuidora',
                    cover_url: video.cover_image_url,
                    tiktok_url: video.share_url,
                    duration: `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2,'0')}`,
                    views_count: video.view_count,
                    likes_count: video.like_count,
                    comments_count: video.comment_count || 'Sin comentarios',
                },
                { onConflict: 'tiktok_id' }
            );
        }

        return { statusCode: 200, body: JSON.stringify({ message: 'Sincronizado con exito' }) };
    }catch(error){
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
}
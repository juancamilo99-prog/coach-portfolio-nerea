import crypto from 'node:crypto';
import { supabaseAdmin } from '../api/supabaseAdmin.js';  
const adminKey = process.env.ADMIN_KEY;
const tiktokClientKey = process.env.TIKTOK_CLIENT_KEY;
const tiktokRedirectUri = process.env.TIKTOK_REDIRECT_URI;

export const getRoutetiktok = async(req, res) => {
    try{
        if(!adminKey){
            return res.status(403).json({error: "La key no existe"});
        }
        if(adminKey !== req.query.key){
            return res.status(403).json({error: "Los datos no coinciden"});
        }

        const state = crypto.randomUUID();
        const { error } = await supabaseAdmin.from('oauth_state').insert({ state })

        if(error){
            console.log(error);
            return res.status(500).json({error: "Error al conectarse a la BD"});
        }
        const params = new URLSearchParams({
            client_key: tiktokClientKey,
            scope: 'user.info.basic,video.list',
            redirect_uri: tiktokRedirectUri,
            state: state,
            response_type: 'code'
        });
        res.redirect(`https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`);
    }catch(error){
        res.status(500).json({error: "Error al obtener la ruta"});
    }
}

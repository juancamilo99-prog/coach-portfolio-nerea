
import { supabaseAdmin } from '../api/supabaseAdmin.js';  

const tiktokClientKey = process.env.TIKTOK_CLIENT_KEY;
const tiktokRedirectUri = process.env.TIKTOK_REDIRECT_URI;
const tiktokClienteSecret = process.env.TIKTOK_CLIENT_SECRET;
const redirectURL = process.env.FRONTEND_URL;


export const getTiktokCallback = async(req,res) =>{
    try{
       const { code, state } = req.query;
       if(!code || !state){
        return res.status(400).json({error: "LA URL esta incompleta o mal formada"});
       }
       const { data, error } = await supabaseAdmin.from('oauth_state').select('state, created_at').eq('state', state);

       
       if(error){
        return res.status(500).json({error: "Error al conectarse a la BD"});
       }

       if(data.length === 0){
        return res.status(403).json({ error: "State no valido o caducado"});
       }

       const { error: errorTicket } = await supabaseAdmin.from('oauth_state').delete().eq('state', state);

       if(errorTicket) {
        return res.status(500).json({ error: "Error al eliminar el ticket"});
       }

       const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            client_key: tiktokClientKey,
            client_secret: tiktokClienteSecret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: tiktokRedirectUri,
        })
    });  

    const tokenData = await response.json();
    if(!response.ok || tokenData.error){
        console.log(tokenData);
        return res.status(500).json({error: "Error al obtener la respuesta."})
    }

    const { error: errorCall} = await supabaseAdmin.from('tiktok_tokens').upsert({
        open_id: tokenData.open_id,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        scope: tokenData.scope,
        expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
        refresh_expires_at: new Date(Date.now() + tokenData.refresh_expires_in * 1000).toISOString(),
        updated_at: new Date().toISOString()
    }, { onConflict: 'open_id'});

    if(errorCall){
        return res.status(500).json({ error: "Error al guardar el token"});
    }

    res.redirect(redirectURL);

    }catch(error){
        res.status(500).json({ error: "Error al obtener el callback"});
    }
}
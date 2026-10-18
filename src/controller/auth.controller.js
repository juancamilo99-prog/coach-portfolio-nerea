import crypto from 'node:crypto';
import { supabaseAdmin } from '../api/supabaseAdmin.js';  
const adminKey = process.env.ADMIN_KEY;

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
        res.status(200).json("OK!");
    }catch(error){
        res.status(500).json({error: "Error al obtener la ruta"});
    }
}

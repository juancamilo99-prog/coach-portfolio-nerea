import { data } from 'react-router-dom';
import { supabaseAdmin } from '../api/supabaseAdmin.js';  
import { getRoutetiktok } from './auth.controller.js';

export const getTiktokCallback = async(req,res) =>{
    try{
       const { code, state } = req.query;
       if(!code || !state){
        return res.status(400).json({error: "LA URL esta incompleta o mal formada"});
       }
       const { data, error } = await supabaseAdmin.from('oauth_state').select('state', 'created_at').eq('state', state);
       
       if(error){
        return res.status(500).json({error: "Error al conectarse a la BD"});
       }

       if(data.length === 0){
        return res.status(403).json({ error: "State no valido o caducado"});
       }

       
    }catch(error){

    }
}
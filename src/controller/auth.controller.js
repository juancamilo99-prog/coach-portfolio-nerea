
const adminKey = process.env.ADMIN_KEY;

export const getRoutetiktok = async(req, res) => {
    try{
        if(!adminKey){
            return res.status(403).json({error: "La key no existe"});
        }
        if(adminKey !== req.query.key){
            return res.status(403).json({error: "Los datos no coinciden"});
        }
        res.status(200).json("OK!");
    }catch(error){
        res.status(400).json({error: "Error al obtener la ruta"});
    }
}

import "dotenv/config";
import express from 'express';
import authTiktok from "./src/routes/auth.routes.js"
//const serverOn = require("./src/api/tiktokService");
const app = express();
const PORT = 3000;

app.use(express.json());

//ruta authenticacion
app.use("/auth/tiktok/", authTiktok /* aqui tendria que poner la ruta.routes.js */)


//manejador de errores
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})

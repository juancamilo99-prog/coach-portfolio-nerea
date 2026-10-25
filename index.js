import "dotenv/config";
import cors from 'cors';
import express from 'express';
import authTiktok from "./src/routes/auth.routes.js"
import syncTiktok from "./src/routes/sync.routes.js"
import newsletter from "./src/routes/newsletter.routes.js"
//const serverOn = require("./src/api/tiktokService");
const frontedUrl = process.env.FRONTEND_URL;
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', frontedUrl]
}));

//ruta authenticacion
app.use("/auth/tiktok/", authTiktok /* aqui tendria que poner la ruta.routes.js */)
app.use("/api/sync/", syncTiktok)
app.use("/api/newsletter/", newsletter)


//manejador de errores
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})

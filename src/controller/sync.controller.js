import { supabaseAdmin } from "../api/supabaseAdmin.js";

const tiktokClientKey = process.env.TIKTOK_CLIENT_KEY;
const tiktokClienteSecret = process.env.TIKTOK_CLIENT_SECRET;
const adminKey = process.env.ADMIN_KEY;

export const syncTiktokVideos = async (req, res) => {
  try {
    if (!adminKey) {
      return res.status(403).json({ error: "La key no existe" });
    }

    if (adminKey !== req.query.key) {
      return res.status(403).json({ error: "Los datos no coinciden" });
    }

    const { data: tokenRow, error } = await supabaseAdmin
      .from("tiktok_tokens")
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({ error: "Error al conectarse a la BD" });
    }

    const fechaExpiracion = new Date(tokenRow.expires_at);
    const fechaActual = new Date();
    let accessToken = tokenRow.access_token;

    if (fechaExpiracion <= fechaActual) {
      const response = await fetch(
        "https://open.tiktokapis.com/v2/oauth/token/",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_key: tiktokClientKey,
            client_secret: tiktokClienteSecret,
            grant_type: "refresh_token",
            refresh_token: tokenRow.refresh_token,
          }),
        },
      );
      const refreshData = await response.json();
      if (!response.ok || refreshData.error) {
        return res.status(500).json({ error: "Error al obtener la respuesta" });
      }
      accessToken = refreshData.access_token;

      const { error: errorRefresh } = await supabaseAdmin
        .from("tiktok_tokens")
        .upsert(
          {
            open_id: refreshData.open_id,
            scope: refreshData.scope,
            access_token: accessToken,
            expires_at: new Date(
              Date.now() + refreshData.expires_in * 1000,
            ).toISOString(),
            refresh_token: refreshData.refresh_token,
            refresh_expires_at: new Date(
              Date.now() + refreshData.refresh_expires_in * 1000,
            ).toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "open_id" },
        );

      if (errorRefresh) {
        return res.status(500).json({ error: "Error al refrescar el token" });
      }
    }

    const urlFields =
      "https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,cover_image_url,share_url,duration,view_count,like_count,comment_count";

    const videoResponse = await fetch(urlFields, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ max_count: 20 }),
    });

    const videoData = await videoResponse.json();
    if (!videoResponse.ok || videoData.error.code !== "ok") {
      console.log(videoData);
      return res
        .status(500)
        .json({ error: "Error al obtener la respuest en videoData" });
    }

    const videosTiktok = videoData.data?.videos || [];

    const videoRows = videosTiktok.map((video) => ({
      tiktok_id: video.id,
      title: video.title || "Sin titulo",
      subtitle: video.video_description || "Sin descripción",
      cover_url: video.cover_image_url,
      tiktok_url: video.share_url,
      duration: `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, "0")}`,
      views_count: video.view_count,
      likes_count: video.like_count,
      comments_count: video.comment_count || 0,
    }));

    const { error: errorVideo } = await supabaseAdmin
      .from("videos")
      .upsert(videoRows, { onConflict: "tiktok_id" });

    if (errorVideo) {
      return res
        .status(500)
        .json({ error: "Error al guardar el contenido en la base de datos" });
    }

    res
      .status(200)
      .json({
        message: "Exito, videos sincronizados: ",
        count: videoRows.length,
      });
  } catch (error) {
    return res.status(500).json({ error: "Error al sincronizar el contenido" });
  }
};

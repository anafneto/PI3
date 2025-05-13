const { models } = require("../config/db");

const noticiaController = {
  getAllNoticias: async (req, res) => {
    try {
      const noticias = await models.noticias.findAll({
        order: [["data_noticia", "DESC"]],
      });
      res.json(noticias);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getNoticiaById: async (req, res) => {
    try {
      const noticia = await models.noticias.findByPk(req.params.id);
      if (noticia) {
        res.json(noticia);
      } else {
        res.status(404).json({ message: "Notícia não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createNoticia: async (req, res) => {
    try {
      const { TITULO_NOTICIA, CORPO_NOTICIA } = req.body;

      // Validate required fields
      if (!TITULO_NOTICIA || !CORPO_NOTICIA) {
        return res.status(400).json({
          message: "Título e corpo da notícia são obrigatórios",
        });
      }

      // Create the noticia with current date
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
      const newNoticia = await models.noticias.create({
        titulo_noticia: TITULO_NOTICIA,
        corpo_noticia: CORPO_NOTICIA,
        data_noticia: today,
      });

      res.status(201).json(newNoticia);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateNoticia: async (req, res) => {
    try {
      const { TITULO_NOTICIA, CORPO_NOTICIA, DATA_NOTICIA } = req.body;
      const noticiaId = req.params.id;

      // Check if the noticia exists
      const noticia = await models.noticias.findByPk(noticiaId);
      if (!noticia) {
        return res.status(404).json({ message: "Notícia não encontrada" });
      }

      // Update noticia fields
      const updateFields = {};
      if (TITULO_NOTICIA) updateFields.titulo_noticia = TITULO_NOTICIA;
      if (CORPO_NOTICIA) updateFields.corpo_noticia = CORPO_NOTICIA;
      if (DATA_NOTICIA) updateFields.data_noticia = DATA_NOTICIA;

      // Update the noticia
      await noticia.update(updateFields);

      // Fetch the updated noticia
      const updatedNoticia = await models.noticias.findByPk(noticiaId);

      res.json(updatedNoticia);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteNoticia: async (req, res) => {
    try {
      const noticiaId = req.params.id;

      // Check if the noticia exists
      const noticia = await models.noticias.findByPk(noticiaId);
      if (!noticia) {
        return res.status(404).json({ message: "Notícia não encontrada" });
      }

      // Delete the noticia
      await noticia.destroy();

      res.json({ message: "Notícia excluída com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getRecentNoticias: async (req, res) => {
    try {
      // Get limit from query params or default to 5
      const limit = parseInt(req.query.limit) || 5;

      const noticias = await models.noticias.findAll({
        order: [["data_noticia", "DESC"]],
        limit: limit,
      });

      res.json(noticias);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = noticiaController;

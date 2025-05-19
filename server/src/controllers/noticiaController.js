const { models } = require("../config/db");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads/noticias");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `noticia-${uniqueSuffix}${extension}`);
  },
});

// File filter for images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Initialize the upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
});

// Helper function to delete old image
const deleteOldImage = (imagePath) => {
  if (!imagePath) return;

  const fullPath = path.join(__dirname, "../..", imagePath.replace(/^\//, ""));

  // Check if file exists before trying to delete
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
      console.log(`Deleted old image: ${fullPath}`);
    } catch (err) {
      console.error(`Error deleting file ${fullPath}:`, err);
    }
  }
};

const noticiaController = {
  // Multer middleware for single image upload
  uploadImage: upload.single("imagem"),

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

      // Determine image URL (if image was uploaded)
      let imagemUrl = null;
      if (req.file) {
        // Generate URL for the uploaded image
        imagemUrl = `/uploads/noticias/${req.file.filename}`;
      }

      const newNoticia = await models.noticias.create({
        titulo_noticia: TITULO_NOTICIA,
        corpo_noticia: CORPO_NOTICIA,
        data_noticia: today,
        imagem_url: imagemUrl,
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

      // Store old image path in case we need to delete it
      const oldImageUrl = noticia.imagem_url;

      // Update noticia fields
      const updateFields = {};
      if (TITULO_NOTICIA) updateFields.titulo_noticia = TITULO_NOTICIA;
      if (CORPO_NOTICIA) updateFields.corpo_noticia = CORPO_NOTICIA;
      if (DATA_NOTICIA) updateFields.data_noticia = DATA_NOTICIA;

      // If a new image was uploaded, update the image URL
      if (req.file) {
        updateFields.imagem_url = `/uploads/noticias/${req.file.filename}`;

        // Delete old image if it exists
        if (oldImageUrl) {
          deleteOldImage(oldImageUrl);
        }
      }

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

      // Delete associated image if exists
      if (noticia.imagem_url) {
        deleteOldImage(noticia.imagem_url);
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

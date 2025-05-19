const express = require("express");
const router = express.Router();
const noticiaController = require("../controllers/noticiaController");

// GET all noticias
router.get("/", noticiaController.getAllNoticias);

// GET recent noticias (with optional limit parameter)
router.get("/recent", noticiaController.getRecentNoticias);

// GET a specific noticia
router.get("/:id", noticiaController.getNoticiaById);

// POST create a new noticia (with image upload)
router.post(
  "/",
  noticiaController.uploadImage,
  noticiaController.createNoticia
);

// PUT update a noticia (with image upload)
router.put(
  "/:id",
  noticiaController.uploadImage,
  noticiaController.updateNoticia
);

// DELETE a noticia
router.delete("/:id", noticiaController.deleteNoticia);

module.exports = router;

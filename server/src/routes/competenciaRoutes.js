const express = require("express");
const router = express.Router();
const competenciaController = require("../controllers/competenciaController");

// GET all competencias
router.get("/", competenciaController.getAllCompetencias);

// GET a specific competencia
router.get("/:id", competenciaController.getCompetenciaById);

// POST create a new competencia
router.post("/", competenciaController.createCompetencia);

// PUT update a competencia
router.put("/:id", competenciaController.updateCompetencia);

// DELETE a competencia
router.delete("/:id", competenciaController.deleteCompetencia);

// GET all candidates with a specific competencia
router.get("/:id/candidatos", competenciaController.getCandidatosByCompetencia);

module.exports = router;

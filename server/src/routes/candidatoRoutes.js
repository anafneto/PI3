const express = require("express");
const router = express.Router();
const candidatoController = require("../controllers/candidatoController");

// GET all candidates
router.get("/", candidatoController.getAllCandidatos);

// GET a specific candidate
router.get("/:id", candidatoController.getCandidatoById);

// POST create a new candidate
router.post("/", candidatoController.createCandidato);

// PUT update a candidate
router.put("/:id", candidatoController.updateCandidato);

// DELETE a candidate
router.delete("/:id", candidatoController.deleteCandidato);

// Add a competencia to a candidate
router.post("/:id/competencias", candidatoController.addCompetencia);

// Remove a competencia from a candidate
router.delete(
  "/:id/competencias/:competenciaId",
  candidatoController.removeCompetencia
);

module.exports = router;

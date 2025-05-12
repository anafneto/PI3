const express = require("express");
const router = express.Router();
const propostasController = require("../controllers/propostaController");

// GET all propostas
router.get("/", propostasController.getAllPropostas);

// GET a specific proposta
router.get("/:id", propostasController.getPropostaById);

// POST create a new proposta
router.post("/", propostasController.createProposta);

// PUT update a proposta
router.put("/:id", propostasController.updateProposta);

// DELETE a proposta
router.delete("/:id", propostasController.deleteProposta);

// POST add a competencia to a proposta
router.post("/:id/competencias", propostasController.addCompetencia);

// DELETE remove a competencia from a proposta
router.delete(
  "/:id/competencias/:competenciaId",
  propostasController.removeCompetencia
);

// GET all propostas with a specific competencia
router.get(
  "/competencias/:competenciaId",
  propostasController.getPropostasByCompetencia
);

module.exports = router;

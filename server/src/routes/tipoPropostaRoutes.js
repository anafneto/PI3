const express = require("express");
const router = express.Router();
const tipoPropostaController = require("../controllers/tipoPropostaController");

// GET all tipos propostas
router.get("/", tipoPropostaController.getAllTipoPropostas);

// GET a specific tipo proposta
router.get("/:id", tipoPropostaController.getTipoPropostaById);

// POST initialize default tipos propostas
router.post("/initialize", tipoPropostaController.initializeTipoPropostas);

module.exports = router;

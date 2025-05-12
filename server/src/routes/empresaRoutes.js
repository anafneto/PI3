const express = require("express");
const router = express.Router();
const empresaController = require("../controllers/empresaController");

// GET all empresas
router.get("/", empresaController.getAllEmpresas);

// GET a specific empresa
router.get("/:id", empresaController.getEmpresaById);

// POST create a new empresa
router.post("/", empresaController.createEmpresa);

// PUT update an empresa
router.put("/:id", empresaController.updateEmpresa);

// DELETE an empresa
router.delete("/:id", empresaController.deleteEmpresa);

// GET all propostas for a specific empresa
router.get("/:id/propostas", empresaController.getPropostasByEmpresa);

module.exports = router;

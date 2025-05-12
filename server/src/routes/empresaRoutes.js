const express = require("express");
const router = express.Router();
const empresaController = require("../controllers/empresaController.js");

// GET all Empresas
router.get("/", empresaController.getAllEmpresas);

// GET a specific Empresa
router.get("/:id", empresaController.getEmpresaById);

// POST create a new Empres
// router.post("/", empresaController.createEmpresa);

// PUT update a Empresa
// router.put("/:id", empresaController.updateEmpresa);

// DELETE a Empresa
// router.delete("/:id", empresaController.deleteEmpresa);

module.exports = router;

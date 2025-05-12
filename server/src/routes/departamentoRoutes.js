const express = require("express");
const router = express.Router();
const departamentoController = require("../controllers/departamentoController");

// GET all departamentos
router.get("/", departamentoController.getAllDepartamentos);

// GET a specific departamento
router.get("/:id", departamentoController.getDepartamentoById);

// POST create a new departamento
router.post("/", departamentoController.createDepartamento);

// PUT update a departamento
router.put("/:id", departamentoController.updateDepartamento);

// DELETE a departamento
router.delete("/:id", departamentoController.deleteDepartamento);

// GET all gestores for a specific departamento
router.get("/:id/gestores", departamentoController.getGestoresByDepartamento);

// GET all propostas for a specific departamento
router.get("/:id/propostas", departamentoController.getPropostasByDepartamento);

module.exports = router;

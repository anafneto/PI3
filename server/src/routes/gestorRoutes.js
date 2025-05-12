const express = require("express");
const router = express.Router();
const gestorController = require("../controllers/gestorController");

// GET all gestores
router.get("/", gestorController.getAllGestores);

// GET a specific gestor
router.get("/:id", gestorController.getGestorById);

// POST create a new gestor
router.post("/", gestorController.createGestor);

// PUT update a gestor
router.put("/:id", gestorController.updateGestor);

// DELETE a gestor
router.delete("/:id", gestorController.deleteGestor);

// GET gestores by department
router.get(
  "/departamento/:departamentoId",
  gestorController.getGestoresByDepartamento
);

module.exports = router;

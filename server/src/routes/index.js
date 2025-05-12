const express = require("express");
const router = express.Router();
const candidatoRoutes = require("./candidatoRoutes");
const empresaRoutes = require("./empresaRoutes");
const competenciaRoutes = require("./competenciaRoutes");

// Route groups
router.use("/candidatos", candidatoRoutes);
router.use("/empresas", empresaRoutes);
router.use("/competencias", competenciaRoutes);

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

module.exports = router;

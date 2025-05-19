const express = require("express");
const router = express.Router();
const candidatoRoutes = require("./candidatoRoutes");
const empresaRoutes = require("./empresaRoutes");
const competenciaRoutes = require("./competenciaRoutes");
const departamentoRoutes = require("./departamentoRoutes");
const gestorRoutes = require("./gestorRoutes");
const tipoPropostaRoutes = require("./tipoPropostaRoutes");
const propostaRoutes = require("./propostaRoutes");
const noticiaRoutes = require("./noticiaRoutes");
const notificacoesPersonalizadasRoutes = require("./notificacoesPersonalizadasRoutes");
const notificacoesGeraisRoutes = require("./notificacoesGeraisRoutes");

// Route groups
router.use("/candidatos", candidatoRoutes);
router.use("/empresas", empresaRoutes);
router.use("/competencias", competenciaRoutes);
router.use("/departamentos", departamentoRoutes);
router.use("/gestores", gestorRoutes);
router.use("/tipos-proposta", tipoPropostaRoutes);
router.use("/propostas", propostaRoutes);
router.use("/noticias", noticiaRoutes);
router.use("/notificacoes-personalizadas", notificacoesPersonalizadasRoutes);
router.use("/notificacoes-gerais", notificacoesGeraisRoutes);

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

module.exports = router;

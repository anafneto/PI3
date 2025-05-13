const express = require("express");
const router = express.Router();
const path = require("path");

// Dashboard
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/admin/dashboard.html"));
});

// Login page
router.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/admin/login.html"));
});

// Propostas routes
router.get("/propostas", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/propostas/index.html"));
});

router.get("/propostas/new", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/propostas/form.html"));
});

router.get("/propostas/:id", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/propostas/view.html"));
});

router.get("/propostas/:id/edit", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/propostas/form.html"));
});

// Candidatos routes
router.get("/candidatos", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/candidatos/index.html"));
});

router.get("/candidatos/new", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/candidatos/form.html"));
});

router.get("/candidatos/:id", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/candidatos/view.html"));
});

router.get("/candidatos/:id/edit", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/candidatos/form.html"));
});

// Empresas routes
router.get("/empresas", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/empresas/index.html"));
});

router.get("/empresas/new", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/empresas/form.html"));
});

router.get("/empresas/:id", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/empresas/view.html"));
});

router.get("/empresas/:id/edit", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/empresas/form.html"));
});

// Noticias routes

router.get("/noticias", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/noticias/index.html"));
});

module.exports = router;

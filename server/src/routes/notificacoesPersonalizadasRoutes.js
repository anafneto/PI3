const express = require("express");
const router = express.Router();
const notificacoesController = require("../controllers/notificacoesPersonalizadasController");

// GET all notifications for a specific candidate
router.get(
  "/candidato/:nrMecanografico",
  notificacoesController.getCandidatoNotifications
);

// GET unread notifications count for a candidate
router.get(
  "/candidato/:nrMecanografico/unread/count",
  notificacoesController.getUnreadCount
);

// PUT mark notification as read
router.put(
  "/candidato/:nrMecanografico/read/:notificationId",
  notificacoesController.markAsRead
);

// PUT mark all notifications as read for a candidate
router.put(
  "/candidato/:nrMecanografico/read/all",
  notificacoesController.markAllAsRead
);

// POST test the matching logic
router.post("/test-matching", notificacoesController.testMatching);

module.exports = router;

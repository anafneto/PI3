const express = require("express");
const router = express.Router();
const notificacoesController = require("../controllers/notificacoesGeraisController");

// GET all general notifications
router.get("/", notificacoesController.getAllNotificacoes);

// GET unread notifications count
router.get("/unread/count", notificacoesController.getUnreadCount);

// GET a specific notification
router.get("/:id", notificacoesController.getNotificacaoById);

// POST create a new notification
router.post("/", notificacoesController.createNotificacao);

// PUT mark a notification as read
router.put("/:id/read", notificacoesController.markAsRead);

// PUT mark all notifications as read
router.put("/read/all", notificacoesController.markAllAsRead);

// DELETE a notification
router.delete("/:id", notificacoesController.deleteNotificacao);

module.exports = router;

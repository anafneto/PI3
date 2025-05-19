const { models, sequelize } = require("../config/db");
const { Op } = require("sequelize");

const notificacoesGeraisController = {
  // Get all general notifications
  getAllNotificacoes: async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : null;
      const showOnlyUnread = req.query.unreadOnly === "true";

      const options = {
        order: [["data_hora", "DESC"]],
      };

      if (limit) {
        options.limit = limit;
      }

      if (showOnlyUnread) {
        options.where = { lido: false };
      }

      const notifications = await models.notificacoes_gerais.findAll(options);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching general notifications:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Get a specific notification
  getNotificacaoById: async (req, res) => {
    try {
      const { id } = req.params;
      const notification = await models.notificacoes_gerais.findByPk(id);

      if (!notification) {
        return res.status(404).json({ message: "Notificação não encontrada" });
      }

      res.json(notification);
    } catch (error) {
      console.error("Error fetching notification by ID:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new general notification
  createNotificacao: async (req, res) => {
    try {
      const { mensagem } = req.body;

      if (!mensagem) {
        return res.status(400).json({ message: "Mensagem é obrigatória" });
      }

      const newNotification = await models.notificacoes_gerais.create({
        mensagem,
        data_hora: new Date(),
        lido: false,
      });

      res.status(201).json(newNotification);
    } catch (error) {
      console.error("Error creating general notification:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Update a notification's read status
  markAsRead: async (req, res) => {
    try {
      const { id } = req.params;
      const notification = await models.notificacoes_gerais.findByPk(id);

      if (!notification) {
        return res.status(404).json({ message: "Notificação não encontrada" });
      }

      await models.notificacoes_gerais.update(
        { lido: true },
        { where: { id_msg_geral: id } }
      );

      res.json({ message: "Notificação marcada como lida" });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Mark all notifications as read
  markAllAsRead: async (req, res) => {
    try {
      await models.notificacoes_gerais.update(
        { lido: true },
        { where: { lido: false } }
      );

      res.json({ message: "Todas as notificações marcadas como lidas" });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Delete a notification
  deleteNotificacao: async (req, res) => {
    try {
      const { id } = req.params;
      const notification = await models.notificacoes_gerais.findByPk(id);

      if (!notification) {
        return res.status(404).json({ message: "Notificação não encontrada" });
      }

      await models.notificacoes_gerais.destroy({ where: { id_msg_geral: id } });

      res.json({ message: "Notificação excluída com sucesso" });
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Get unread notifications count
  getUnreadCount: async (req, res) => {
    try {
      const count = await models.notificacoes_gerais.count({
        where: { lido: false },
      });

      res.json({ count });
    } catch (error) {
      console.error("Error counting unread notifications:", error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = notificacoesGeraisController;

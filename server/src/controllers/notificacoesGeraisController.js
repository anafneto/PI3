// Controlador de Notificações Gerais
// Este ficheiro gere as notificações gerais do sistema, que são visíveis para todos os utilizadores
// Ao contrário das notificações personalizadas, estas são difundidas para todos

const { models, sequelize } = require("../config/db"); // Importa os modelos e a conexão com a BD
const { Op } = require("sequelize"); // Importa operadores Sequelize para consultas avançadas

const notificacoesGeraisController = {
  // Método para obter todas as notificações gerais
  // Suporta parâmetros de consulta para limitar a quantidade ou mostrar apenas não lidas
  getAllNotificacoes: async (req, res) => {
    try {
      // Extrai os parâmetros de consulta da URL
      const limit = req.query.limit ? parseInt(req.query.limit) : null; // Número máximo de notificações
      const showOnlyUnread = req.query.unreadOnly === "true"; // Filtrar apenas não lidas?

      // Configura as opções da consulta
      const options = {
        order: [["data_hora", "DESC"]], // Ordena por data, mais recentes primeiro
      };

      // Adiciona limite se especificado
      if (limit) {
        options.limit = limit;
      }

      // Adiciona filtro de não lidas se solicitado
      if (showOnlyUnread) {
        options.where = { lido: false };
      }

      // Executa a consulta com as opções configuradas
      const notifications = await models.notificacoes_gerais.findAll(options);
      res.json(notifications); // Devolve as notificações como JSON
    } catch (error) {
      // Regista o erro e devolve uma resposta de erro
      console.error("Error fetching general notifications:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter uma notificação específica pelo seu ID
  getNotificacaoById: async (req, res) => {
    try {
      const { id } = req.params; // Extrai o ID dos parâmetros da URL
      const notification = await models.notificacoes_gerais.findByPk(id);

      // Se a notificação não existir, devolve erro 404
      if (!notification) {
        return res.status(404).json({ message: "Notificação não encontrada" });
      }

      // Devolve a notificação encontrada
      res.json(notification);
    } catch (error) {
      console.error("Error fetching notification by ID:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Método para criar uma nova notificação geral
  // Esta função seria normalmente utilizada por administradores para enviar anúncios a todos os utilizadores
  createNotificacao: async (req, res) => {
    try {
      const { mensagem } = req.body; // Extrai a mensagem do corpo do pedido

      // Valida se a mensagem foi fornecida
      if (!mensagem) {
        return res.status(400).json({ message: "Mensagem é obrigatória" });
      }

      // Cria a nova notificação na base de dados
      const newNotification = await models.notificacoes_gerais.create({
        mensagem, // A mensagem a ser exibida
        data_hora: new Date(), // Data e hora atuais
        lido: false, // Inicialmente não lida
      });

      // Devolve a notificação criada com código 201 (created)
      res.status(201).json(newNotification);
    } catch (error) {
      console.error("Error creating general notification:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Método para marcar uma notificação específica como lida
  markAsRead: async (req, res) => {
    try {
      const { id } = req.params; // Extrai o ID da notificação
      const notification = await models.notificacoes_gerais.findByPk(id);

      // Verifica se a notificação existe
      if (!notification) {
        return res.status(404).json({ message: "Notificação não encontrada" });
      }

      // Atualiza o estado da notificação para lida
      await models.notificacoes_gerais.update(
        { lido: true },
        { where: { id_msg_geral: id } }
      );

      // Devolve mensagem de sucesso
      res.json({ message: "Notificação marcada como lida" });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Método para marcar todas as notificações gerais como lidas
  // Útil para funcionalidade "marcar todas como lidas"
  markAllAsRead: async (req, res) => {
    try {
      // Atualiza todas as notificações não lidas de uma só vez
      await models.notificacoes_gerais.update(
        { lido: true }, // Define lido como true
        { where: { lido: false } } // Apenas para as que estão não lidas
      );

      // Devolve mensagem de sucesso
      res.json({ message: "Todas as notificações marcadas como lidas" });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Método para eliminar uma notificação
  deleteNotificacao: async (req, res) => {
    try {
      const { id } = req.params; // Extrai o ID da notificação
      const notification = await models.notificacoes_gerais.findByPk(id);

      // Verifica se a notificação existe
      if (!notification) {
        return res.status(404).json({ message: "Notificação não encontrada" });
      }

      // Elimina a notificação da base de dados
      await models.notificacoes_gerais.destroy({ where: { id_msg_geral: id } });

      // Devolve mensagem de sucesso
      res.json({ message: "Notificação excluída com sucesso" });
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter a contagem de notificações não lidas
  // Útil para exibir badges na UI indicando notificações pendentes
  getUnreadCount: async (req, res) => {
    try {
      // Conta o número de notificações gerais não lidas
      const count = await models.notificacoes_gerais.count({
        where: { lido: false },
      });

      // Devolve a contagem
      res.json({ count });
    } catch (error) {
      console.error("Error counting unread notifications:", error);
      res.status(500).json({ message: error.message });
    }
  },
};

// Exporta o controlador para utilização noutras partes da aplicação
module.exports = notificacoesGeraisController;

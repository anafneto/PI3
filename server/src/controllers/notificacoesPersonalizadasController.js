const { models, sequelize } = require("../config/db");
const { Op } = require("sequelize");

const notificacoesPersonalizadasController = {
  // Get all notifications for a specific candidate
  getCandidatoNotifications: async (req, res) => {
    try {
      const nrMecanografico = req.params.nrMecanografico;
      const limit = req.query.limit ? parseInt(req.query.limit) : null;

      // Check if candidate exists
      const candidato = await models.candidatos.findByPk(nrMecanografico);
      if (!candidato) {
        return res.status(404).json({ message: "Candidato não encontrado" });
      }

      // First, get the notification associations for this candidate
      const notificacoesCandidatos =
        await models.notificacoes_candidatos.findAll({
          where: { nr_mecanografico: nrMecanografico },
          attributes: ["id_msg_personalizada"],
          order: [["id_msg_personalizada", "DESC"]],
          limit: limit,
        });

      // No notifications found
      if (notificacoesCandidatos.length === 0) {
        return res.json([]);
      }

      // Extract notification IDs
      const notificationIds = notificacoesCandidatos.map(
        (n) => n.id_msg_personalizada
      );

      // Get the actual notifications
      const notifications = await models.notificacoes_personalizadas.findAll({
        where: {
          id_msg_personalizada: { [Op.in]: notificationIds },
        },
        order: [["data_hora", "DESC"]],
      });

      // Get empresa table structure
      const empresaTableInfo = await sequelize.query(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'empresas'",
        { type: sequelize.QueryTypes.SELECT }
      );

      const empresaColumns = empresaTableInfo.map((c) => c.column_name);
      console.log("Empresa table columns:", empresaColumns);

      // Get tipo_proposta table structure
      const tipoTableInfo = await sequelize.query(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'tipo_proposta'",
        { type: sequelize.QueryTypes.SELECT }
      );

      const tipoColumns = tipoTableInfo.map((c) => c.column_name);
      console.log("Tipo proposta table columns:", tipoColumns);

      // Now get proposal details separately for each notification
      const enrichedNotifications = await Promise.all(
        notifications.map(async (notification) => {
          let proposta = null;
          let empresaInfo = null;
          let tipoInfo = null;

          // Get proposal if it exists
          if (notification.id_proposta) {
            proposta = await models.propostas.findByPk(
              notification.id_proposta,
              {
                attributes: [
                  "id_proposta",
                  "nome_proposta",
                  "descricao_proposta",
                  "id_empresa",
                  "id_tipo_proposta",
                ],
              }
            );

            // Get empresa details if available
            if (proposta && proposta.id_empresa) {
              // Get empresa with only existing columns
              empresaInfo = await models.empresas.findByPk(proposta.id_empresa);

              // Convert to plain object for safer handling
              if (empresaInfo) {
                empresaInfo = empresaInfo.get({ plain: true });

                // Make sure to only include columns that exist in the database
                const safeEmpresaInfo = {};
                Object.keys(empresaInfo).forEach((key) => {
                  if (empresaColumns.includes(key)) {
                    safeEmpresaInfo[key] = empresaInfo[key];
                  }
                });
                empresaInfo = safeEmpresaInfo;
              }
            }

            // Get tipo_proposta details if available
            if (proposta && proposta.id_tipo_proposta) {
              // Get tipo with only existing columns
              tipoInfo = await models.tipo_proposta.findByPk(
                proposta.id_tipo_proposta
              );

              // Convert to plain object
              if (tipoInfo) {
                tipoInfo = tipoInfo.get({ plain: true });

                // Make sure to only include columns that exist in the database
                const safeTipoInfo = {};
                Object.keys(tipoInfo).forEach((key) => {
                  if (tipoColumns.includes(key)) {
                    safeTipoInfo[key] = tipoInfo[key];
                  }
                });
                tipoInfo = safeTipoInfo;
              }
            }
          }

          return {
            id_msg_personalizada: notification.id_msg_personalizada,
            id_proposta: notification.id_proposta,
            mensagem: notification.mensagem,
            data_hora: notification.data_hora,
            lido: notification.lido,
            proposta: proposta
              ? {
                  id_proposta: proposta.id_proposta,
                  nome_proposta: proposta.nome_proposta,
                  descricao_proposta: proposta.descricao_proposta,
                  empresa: empresaInfo,
                  tipo_proposta: tipoInfo,
                }
              : null,
            nr_mecanografico: nrMecanografico,
          };
        })
      );

      res.json(enrichedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Get count of unread notifications for a candidate
  getUnreadCount: async (req, res) => {
    try {
      const nrMecanografico = req.params.nrMecanografico;

      // Check if candidate exists
      const candidato = await models.candidatos.findByPk(nrMecanografico);
      if (!candidato) {
        return res.status(404).json({ message: "Candidato não encontrado" });
      }

      // Simplified query to avoid table name conflicts
      // First get notification IDs for this candidate
      const candidatoNotifs = await models.notificacoes_candidatos.findAll({
        where: { nr_mecanografico: nrMecanografico },
        attributes: ["id_msg_personalizada"],
      });

      const notifIds = candidatoNotifs.map((n) => n.id_msg_personalizada);

      // If no notifications exist, return 0
      if (notifIds.length === 0) {
        return res.json({ count: 0 });
      }

      // Count unread notifications
      const count = await models.notificacoes_personalizadas.count({
        where: {
          id_msg_personalizada: { [Op.in]: notifIds },
          lido: false,
        },
      });

      res.json({ count });
    } catch (error) {
      console.error("Error counting unread notifications:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Mark notification as read
  markAsRead: async (req, res) => {
    try {
      const { nrMecanografico, notificationId } = req.params;

      // Check if notification exists and belongs to this candidate
      const notification = await models.notificacoes_candidatos.findOne({
        where: {
          nr_mecanografico: nrMecanografico,
          id_msg_personalizada: notificationId,
        },
      });

      if (!notification) {
        return res.status(404).json({ message: "Notificação não encontrada" });
      }

      // Update notification
      await models.notificacoes_personalizadas.update(
        { lido: true },
        { where: { id_msg_personalizada: notificationId } }
      );

      res.json({ message: "Notificação marcada como lida" });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Mark all notifications as read for a candidate
  markAllAsRead: async (req, res) => {
    try {
      const nrMecanografico = req.params.nrMecanografico;

      // Get all notification IDs for this candidate
      const candidatoNotifs = await models.notificacoes_candidatos.findAll({
        where: { nr_mecanografico: nrMecanografico },
        attributes: ["id_msg_personalizada"],
      });

      const notifIds = candidatoNotifs.map((n) => n.id_msg_personalizada);

      if (notifIds.length === 0) {
        return res.json({ message: "Nenhuma notificação encontrada" });
      }

      // Get unread notifications
      const unreadNotifs = await models.notificacoes_personalizadas.findAll({
        where: {
          id_msg_personalizada: { [Op.in]: notifIds },
          lido: false,
        },
        attributes: ["id_msg_personalizada"],
      });

      if (unreadNotifs.length === 0) {
        return res.json({ message: "Nenhuma notificação não lida encontrada" });
      }

      // Get IDs of unread notifications
      const unreadIds = unreadNotifs.map((n) => n.id_msg_personalizada);

      // Mark all as read
      await models.notificacoes_personalizadas.update(
        { lido: true },
        { where: { id_msg_personalizada: { [Op.in]: unreadIds } } }
      );

      res.json({
        message: `${unreadIds.length} notificações marcadas como lidas`,
      });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Process a new proposal and create notifications for matching candidates
  processNewProposal: async (propostaId) => {
    try {
      console.log(
        `Processing new proposal ${propostaId} for candidate notifications...`
      );

      // Get the proposal first
      const proposta = await models.propostas.findByPk(propostaId);
      if (!proposta) {
        console.error(`Proposal with id ${propostaId} not found`);
        return;
      }

      // Get the proposal's competencies using separate query
      const propostaCompetencias = await models.proposta_competencias.findAll({
        where: { id_proposta: propostaId },
        attributes: ["id_competencia"],
      });

      if (propostaCompetencias.length === 0) {
        console.log(
          `Proposal ${propostaId} has no competencies, skipping notifications`
        );
        return;
      }

      const propostaCompIds = propostaCompetencias.map(
        (comp) => comp.id_competencia
      );
      console.log(`Proposal competencias: ${propostaCompIds.join(", ")}`);

      // Get all candidates
      const candidatos = await models.candidatos.findAll({
        attributes: ["nr_mecanografico"],
      });

      console.log(`Found ${candidatos.length} candidates to check for matches`);

      // For each candidate, check competency match percentage
      const matchingCandidatos = [];

      for (const candidato of candidatos) {
        // Get this candidate's competencies
        const candidatoCompetencias =
          await models.candidato_competencias.findAll({
            where: { nr_mecanografico: candidato.nr_mecanografico },
            attributes: ["id_competencia"],
          });

        if (candidatoCompetencias.length === 0) {
          console.log(
            `Candidate ${candidato.nr_mecanografico} has no competencies, skipping`
          );
          continue; // Skip candidates with no competencies
        }

        const candidatoCompIds = candidatoCompetencias.map(
          (comp) => comp.id_competencia
        );
        console.log(
          `Candidate ${
            candidato.nr_mecanografico
          } competencias: ${candidatoCompIds.join(", ")}`
        );

        // Calculate match percentage
        // Formula: (number of matching competencies / number of competencies in the proposal) * 100
        const matchingCompIds = candidatoCompIds.filter((id) =>
          propostaCompIds.includes(id)
        );
        const matchPercentage =
          (matchingCompIds.length / propostaCompIds.length) * 100;

        console.log(
          `Candidate ${
            candidato.nr_mecanografico
          } match: ${matchPercentage.toFixed(2)}%`
        );

        // If match percentage is at least 80%, add to matching candidates
        if (matchPercentage >= 80) {
          matchingCandidatos.push({
            nrMecanografico: candidato.nr_mecanografico,
            matchPercentage,
          });
          console.log(
            `Candidate ${candidato.nr_mecanografico} meets the match threshold`
          );
        }
      }

      if (matchingCandidatos.length === 0) {
        console.log(
          `No candidates match the competencies for proposal ${propostaId}`
        );
        return;
      }

      console.log(
        `Found ${matchingCandidatos.length} matching candidates for proposal ${propostaId}`
      );

      // Create the notification
      const notification = await models.notificacoes_personalizadas.create({
        id_proposta: propostaId,
        mensagem: `As tuas competencias são adequadas para esta proposta - /propostas/${propostaId}`,
        data_hora: new Date(),
        lido: false,
      });

      console.log(
        `Created notification ${notification.id_msg_personalizada} for proposal ${propostaId}`
      );

      // Create associations between the notification and matching candidates
      for (const candidato of matchingCandidatos) {
        await models.notificacoes_candidatos.create({
          id_msg_personalizada: notification.id_msg_personalizada,
          nr_mecanografico: candidato.nrMecanografico,
        });
        console.log(
          `Added notification for candidate ${candidato.nrMecanografico}`
        );
      }

      console.log(`Notification process completed for proposal ${propostaId}`);
      return notification;
    } catch (error) {
      console.error("Error processing proposal for notifications:", error);
    }
  },

  // Test endpoint to manually trigger matching logic
  testMatching: async (req, res) => {
    try {
      const { propostaId } = req.body;

      if (!propostaId) {
        return res.status(400).json({ message: "propostaId is required" });
      }

      const proposta = await models.propostas.findByPk(propostaId);
      if (!proposta) {
        return res.status(404).json({ message: "Proposal not found" });
      }

      const notification =
        await notificacoesPersonalizadasController.processNewProposal(
          propostaId
        );

      res.json({
        message: "Matching process completed",
        notification:
          notification || "No notifications created (no matching candidates)",
      });
    } catch (error) {
      console.error("Error testing notification matching:", error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = notificacoesPersonalizadasController;

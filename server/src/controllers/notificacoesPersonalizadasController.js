// Controlador de Notificações Personalizadas
// Este controlador gere as notificações personalizadas para os candidatos
// baseadas na correspondência entre as suas competências e as competências das propostas

const { models, sequelize } = require("../config/db"); // Importa os modelos e a conexão com a base de dados
const { Op } = require("sequelize"); // Operadores para consultas mais complexas

const notificacoesPersonalizadasController = {
  // Obter todas as notificações para um candidato específico
  // Cada notificação inclui dados enriquecidos da proposta associada
  getCandidatoNotifications: async (req, res) => {
    try {
      const nrMecanografico = req.params.nrMecanografico;
      const limit = req.query.limit ? parseInt(req.query.limit) : null; // Limite opcional de notificações

      // Verifica se o candidato existe
      const candidato = await models.candidatos.findByPk(nrMecanografico);
      if (!candidato) {
        return res.status(404).json({ message: "Candidato não encontrado" });
      }

      // Primeiro, obtém as associações de notificações para este candidato
      // Utilização de uma tabela de junção para relacionar candidatos e notificações
      const notificacoesCandidatos =
        await models.notificacoes_candidatos.findAll({
          where: { nr_mecanografico: nrMecanografico },
          attributes: ["id_msg_personalizada"], // Apenas preciso do ID da notificação
          order: [["id_msg_personalizada", "DESC"]], // Ordenação decrescente (mais recentes primeiro)
          limit: limit, // Limite configurável
        });

      // Se não há notificações, devolve um array vazio
      if (notificacoesCandidatos.length === 0) {
        return res.json([]);
      }

      // Extrai os IDs das notificações
      const notificationIds = notificacoesCandidatos.map(
        (n) => n.id_msg_personalizada
      );

      // Obtém as notificações propriamente ditas
      const notifications = await models.notificacoes_personalizadas.findAll({
        where: {
          id_msg_personalizada: { [Op.in]: notificationIds }, // Operador IN do SQL
        },
        order: [["data_hora", "DESC"]], // Ordenação por data
      });

      // Esta parte é uma validação defensiva contra problemas de esquema da base de dados
      // Obtém a estrutura da tabela 'empresas' para verificar quais colunas realmente existem
      const empresaTableInfo = await sequelize.query(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'empresas'",
        { type: sequelize.QueryTypes.SELECT } // Query SQL direta
      );

      const empresaColumns = empresaTableInfo.map((c) => c.column_name);
      console.log("Empresa table columns:", empresaColumns);

      // Faz o mesmo para a tabela 'tipo_proposta'
      const tipoTableInfo = await sequelize.query(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'tipo_proposta'",
        { type: sequelize.QueryTypes.SELECT }
      );

      const tipoColumns = tipoTableInfo.map((c) => c.column_name);
      console.log("Tipo proposta table columns:", tipoColumns);

      // Para cada notificação, enriquece os dados com informações da proposta associada
      // Promise.all permite executar todas estas operações em paralelo
      const enrichedNotifications = await Promise.all(
        notifications.map(async (notification) => {
          let proposta = null;
          let empresaInfo = null;
          let tipoInfo = null;

          // Obtém a proposta associada, se existir
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

            // Se a proposta tiver uma empresa associada, obtém os detalhes da empresa
            if (proposta && proposta.id_empresa) {
              empresaInfo = await models.empresas.findByPk(proposta.id_empresa);

              // Converte para um objeto básico para manipulação mais segura
              if (empresaInfo) {
                empresaInfo = empresaInfo.get({ plain: true });

                // Filtra apenas as colunas que sabemos que existem na base de dados
                // Isto evita erros se o modelo e a tabela estiverem dessincronizados
                const safeEmpresaInfo = {};
                Object.keys(empresaInfo).forEach((key) => {
                  if (empresaColumns.includes(key)) {
                    safeEmpresaInfo[key] = empresaInfo[key];
                  }
                });
                empresaInfo = safeEmpresaInfo;
              }
            }

            // Obtém informações do tipo de proposta, se existir
            if (proposta && proposta.id_tipo_proposta) {
              tipoInfo = await models.tipo_proposta.findByPk(
                proposta.id_tipo_proposta
              );

              // Aplica o mesmo processo de segurança para as colunas
              if (tipoInfo) {
                tipoInfo = tipoInfo.get({ plain: true });
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

          // Retorna a notificação enriquecida com todos os dados relacionados
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

      // Devolve as notificações enriquecidas como resposta JSON
      res.json(enrichedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Obter a contagem de notificações não lidas para um candidato
  getUnreadCount: async (req, res) => {
    try {
      const nrMecanografico = req.params.nrMecanografico;

      // Verifica se o candidato existe
      const candidato = await models.candidatos.findByPk(nrMecanografico);
      if (!candidato) {
        return res.status(404).json({ message: "Candidato não encontrado" });
      }

      // Primeiro obtém os IDs das notificações deste candidato
      const candidatoNotifs = await models.notificacoes_candidatos.findAll({
        where: { nr_mecanografico: nrMecanografico },
        attributes: ["id_msg_personalizada"],
      });

      const notifIds = candidatoNotifs.map((n) => n.id_msg_personalizada);

      // Se não há notificações, retorna 0
      if (notifIds.length === 0) {
        return res.json({ count: 0 });
      }

      // Conta apenas as notificações não lidas
      const count = await models.notificacoes_personalizadas.count({
        where: {
          id_msg_personalizada: { [Op.in]: notifIds },
          lido: false, // Apenas as não lidas
        },
      });

      res.json({ count });
    } catch (error) {
      console.error("Error counting unread notifications:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // Marcar uma notificação como lida
  markAsRead: async (req, res) => {
    try {
      const { nrMecanografico, notificationId } = req.params;

      // Verifica se a notificação existe e pertence ao candidato
      const notification = await models.notificacoes_candidatos.findOne({
        where: {
          nr_mecanografico: nrMecanografico,
          id_msg_personalizada: notificationId,
        },
      });

      if (!notification) {
        return res.status(404).json({ message: "Notificação não encontrada" });
      }

      // Atualiza a notificação para lida
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

  // Marcar todas as notificações de um candidato como lidas
  markAllAsRead: async (req, res) => {
    try {
      const nrMecanografico = req.params.nrMecanografico;

      // Obtém todos os IDs de notificações do candidato
      const candidatoNotifs = await models.notificacoes_candidatos.findAll({
        where: { nr_mecanografico: nrMecanografico },
        attributes: ["id_msg_personalizada"],
      });

      const notifIds = candidatoNotifs.map((n) => n.id_msg_personalizada);

      if (notifIds.length === 0) {
        return res.json({ message: "Nenhuma notificação encontrada" });
      }

      // Obtém apenas as notificações não lidas
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

      // Extrai os IDs das notificações não lidas
      const unreadIds = unreadNotifs.map((n) => n.id_msg_personalizada);

      // Marca todas as notificações não lidas como lidas
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

  // Processar uma nova proposta e criar notificações para candidatos com competências correspondentes
  // Este método é chamado automaticamente quando uma nova proposta é criada
  processNewProposal: async (propostaId) => {
    try {
      console.log(
        `Processing new proposal ${propostaId} for candidate notifications...`
      );

      // Obtém a proposta
      const proposta = await models.propostas.findByPk(propostaId);
      if (!proposta) {
        console.error(`Proposal with id ${propostaId} not found`);
        return;
      }

      // Obtém as competências da proposta
      const propostaCompetencias = await models.proposta_competencias.findAll({
        where: { id_proposta: propostaId },
        attributes: ["id_competencia"],
      });

      // Se a proposta não tiver competências, não há como criar notificações
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

      // Obtém todos os candidatos
      const candidatos = await models.candidatos.findAll({
        attributes: ["nr_mecanografico"],
      });

      console.log(`Found ${candidatos.length} candidates to check for matches`);

      // Para cada candidato, verifica a correspondência de competências
      const matchingCandidatos = [];

      for (const candidato of candidatos) {
        // Obtém as competências deste candidato
        const candidatoCompetencias =
          await models.candidato_competencias.findAll({
            where: { nr_mecanografico: candidato.nr_mecanografico },
            attributes: ["id_competencia"],
          });

        // Ignora candidatos sem competências
        if (candidatoCompetencias.length === 0) {
          console.log(
            `Candidate ${candidato.nr_mecanografico} has no competencies, skipping`
          );
          continue;
        }

        const candidatoCompIds = candidatoCompetencias.map(
          (comp) => comp.id_competencia
        );
        console.log(
          `Candidate ${
            candidato.nr_mecanografico
          } competencias: ${candidatoCompIds.join(", ")}`
        );

        // Calcula a percentagem de correspondência
        // Fórmula: (número de competências correspondentes / número de competências da proposta) * 100
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

        // Se a correspondência for pelo menos 80%, adiciona aos candidatos correspondentes
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

      // Se não houver candidatos correspondentes, termina
      if (matchingCandidatos.length === 0) {
        console.log(
          `No candidates match the competencies for proposal ${propostaId}`
        );
        return;
      }

      console.log(
        `Found ${matchingCandidatos.length} matching candidates for proposal ${propostaId}`
      );

      // Cria a notificação
      const notification = await models.notificacoes_personalizadas.create({
        id_proposta: propostaId,
        mensagem: `As tuas competencias são adequadas para esta proposta - /propostas/${propostaId}`,
        data_hora: new Date(),
        lido: false,
      });

      console.log(
        `Created notification ${notification.id_msg_personalizada} for proposal ${propostaId}`
      );

      // Cria associações entre a notificação e os candidatos correspondentes
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

  // Endpoint de teste para iniciar manualmente o processo de correspondência
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

// Exporta o controlador para ser utilizado por outras partes da aplicação
module.exports = notificacoesPersonalizadasController;

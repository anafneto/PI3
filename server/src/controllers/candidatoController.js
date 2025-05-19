// Controlador de Candidatos
// Este ficheiro implementa as operações CRUD para a entidade Candidato e operações relacionadas

const { models } = require("../config/db"); // Importa os modelos Sequelize para acesso à base de dados

const candidatoController = {
  // Método para obter todos os candidatos com as suas competências
  getAllCandidatos: async (req, res) => {
    try {
      // Obtém todos os candidatos da base de dados, incluindo as competências associadas
      const candidatos = await models.candidatos.findAll({
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencia", // Nome da associação definido no modelo
          },
        ],
      });
      // Devolve os candidatos como JSON
      res.json(candidatos);
    } catch (error) {
      // Em caso de erro, devolve um código 500 (erro interno do servidor)
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter um candidato específico pelo seu ID
  getCandidatoById: async (req, res) => {
    try {
      // Procura o candidato pelo ID fornecido nos parâmetros da URL
      const candidato = await models.candidatos.findByPk(req.params.id, {
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencia",
          },
        ],
      });
      if (candidato) {
        // Se o candidato for encontrado, devolve-o
        res.json(candidato);
      } else {
        // Se não for encontrado, devolve um erro 404 (não encontrado)
        res.status(404).json({ message: "Candidate not found" });
      }
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },

  // Método para criar um novo candidato
  createCandidato: async (req, res) => {
    try {
      // Extrai os dados necessários do corpo do pedido
      const { NR_MECANOGRAFICO, PASSWORD_CANDIDATO, DIPLOMADO, competencias } =
        req.body;

      // Cria o candidato na base de dados
      // NOTA: Numa aplicação real, a password deveria ser encriptada
      const newCandidato = await models.candidatos.create({
        nr_mecanografico: NR_MECANOGRAFICO,
        password_candidato: PASSWORD_CANDIDATO, // Deveria ser encriptada
        diplomado: DIPLOMADO,
      });

      // Adiciona as competências, se fornecidas
      if (competencias && competencias.length > 0) {
        // Cria associações entre o candidato e as competências
        const competenciasPromises = competencias.map(async (comp) => {
          return await models.candidato_competencias.create({
            nr_mecanografico: newCandidato.nr_mecanografico,
            id_competencia: comp.ID_COMPETENCIA,
          });
        });

        // Espera que todas as associações sejam criadas
        await Promise.all(competenciasPromises);
      }

      // Obtém o candidato criado com todas as suas associações
      const createdCandidato = await models.candidatos.findByPk(
        newCandidato.nr_mecanografico,
        {
          include: [
            {
              model: models.competencias,
              as: "id_competencia_competencia",
            },
          ],
        }
      );

      // Devolve o candidato criado com código 201 (created)
      res.status(201).json(createdCandidato);
    } catch (error) {
      // Em caso de erro, devolve um código 400 (bad request)
      res.status(400).json({ message: error.message });
    }
  },

  // Método para atualizar um candidato existente
  updateCandidato: async (req, res) => {
    try {
      // Extrai os dados do corpo do pedido e o ID do candidato
      const { PASSWORD_CANDIDATO, DIPLOMADO, competencias } = req.body;
      const candidatoId = req.params.id;

      // Verifica se o candidato existe
      const candidato = await models.candidatos.findByPk(candidatoId);
      if (!candidato) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      // Prepara os campos para atualização
      // Só inclui campos que foram fornecidos no pedido
      const updateFields = {};
      if (PASSWORD_CANDIDATO)
        updateFields.password_candidato = PASSWORD_CANDIDATO;
      if (DIPLOMADO !== undefined) updateFields.diplomado = DIPLOMADO;

      // Atualiza o candidato com os novos campos
      await candidato.update(updateFields);

      // Atualiza as competências, se fornecidas
      if (competencias && competencias.length > 0) {
        // Remove todas as associações existentes
        // Esta é uma abordagem "substituir tudo" em vez de atualizar individualmente
        await models.candidato_competencias.destroy({
          where: { nr_mecanografico: candidatoId },
        });

        // Cria novas associações para cada competência
        const competenciasPromises = competencias.map(async (comp) => {
          return await models.candidato_competencias.create({
            nr_mecanografico: candidatoId,
            id_competencia: comp.ID_COMPETENCIA,
          });
        });

        // Espera que todas as associações sejam criadas
        await Promise.all(competenciasPromises);
      }

      // Obtém o candidato atualizado com todas as suas associações
      const updatedCandidato = await models.candidatos.findByPk(candidatoId, {
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencia",
          },
        ],
      });

      // Devolve o candidato atualizado
      res.json(updatedCandidato);
    } catch (error) {
      // Em caso de erro, devolve um código 400
      res.status(400).json({ message: error.message });
    }
  },

  // Método para eliminar um candidato
  deleteCandidato: async (req, res) => {
    try {
      const candidatoId = req.params.id;

      // Verifica se o candidato existe
      const candidato = await models.candidatos.findByPk(candidatoId);
      if (!candidato) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      // Elimina primeiro os registos associados (competências)
      // Isto é necessário para evitar violações de restrições de chave estrangeira
      await models.candidato_competencias.destroy({
        where: { nr_mecanografico: candidatoId },
      });

      // Elimina o candidato
      await candidato.destroy();

      // Devolve mensagem de sucesso
      res.json({ message: "Candidate deleted successfully" });
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },

  // Método para adicionar uma competência a um candidato
  addCompetencia: async (req, res) => {
    try {
      const candidatoId = req.params.id;
      const { ID_COMPETENCIA } = req.body;

      // Verifica se o candidato existe
      const candidato = await models.candidatos.findByPk(candidatoId);
      if (!candidato) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      // Verifica se a competência existe
      const competencia = await models.competencias.findByPk(ID_COMPETENCIA);
      if (!competencia) {
        return res.status(404).json({ message: "Competencia not found" });
      }

      // Verifica se a associação já existe
      // Isto evita duplicação de competências para o mesmo candidato
      const existingAssoc = await models.candidato_competencias.findOne({
        where: {
          nr_mecanografico: candidatoId,
          id_competencia: ID_COMPETENCIA,
        },
      });

      if (existingAssoc) {
        return res
          .status(400)
          .json({ message: "Candidate already has this competencia" });
      }

      // Cria a associação entre o candidato e a competência
      await models.candidato_competencias.create({
        nr_mecanografico: candidatoId,
        id_competencia: ID_COMPETENCIA,
      });

      // Obtém o candidato atualizado com todas as suas competências
      const updatedCandidato = await models.candidatos.findByPk(candidatoId, {
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencia",
          },
        ],
      });

      // Devolve o candidato atualizado
      res.json(updatedCandidato);
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },

  // Método para remover uma competência de um candidato
  removeCompetencia: async (req, res) => {
    try {
      const candidatoId = req.params.id;
      const competenciaId = req.params.competenciaId;

      // Verifica se a associação entre candidato e competência existe
      const association = await models.candidato_competencias.findOne({
        where: {
          nr_mecanografico: candidatoId,
          id_competencia: competenciaId,
        },
      });

      if (!association) {
        return res
          .status(404)
          .json({ message: "Candidate does not have this competencia" });
      }

      // Remove a associação
      await association.destroy();

      // Obtém o candidato atualizado com todas as suas competências
      const updatedCandidato = await models.candidatos.findByPk(candidatoId, {
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencia",
          },
        ],
      });

      // Devolve o candidato atualizado
      res.json(updatedCandidato);
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },
};

// Exporta o controlador para ser utilizado noutras partes da aplicação
module.exports = candidatoController;

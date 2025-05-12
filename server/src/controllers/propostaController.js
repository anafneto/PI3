const { models } = require("../config/db");

const propostasController = {
  getAllPropostas: async (req, res) => {
    try {
      const propostas = await models.propostas.findAll({
        include: [
          {
            model: models.empresas,
            as: "id_empresa_empresa",
          },
          {
            model: models.departamentos,
            as: "id_departamento_departamento",
          },
          {
            model: models.tipo_proposta,
            as: "id_tipo_proposta_tipo_propostum",
          },
          {
            model: models.competencias,
            as: "id_competencia_competencias_proposta_competencia",
          },
        ],
      });
      res.json(propostas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPropostaById: async (req, res) => {
    try {
      const proposta = await models.propostas.findByPk(req.params.id, {
        include: [
          {
            model: models.empresas,
            as: "id_empresa_empresa",
          },
          {
            model: models.departamentos,
            as: "id_departamento_departamento",
          },
          {
            model: models.tipo_proposta,
            as: "id_tipo_proposta_tipo_propostum",
          },
          {
            model: models.competencias,
            as: "id_competencia_competencias_proposta_competencia",
          },
        ],
      });

      if (proposta) {
        res.json(proposta);
      } else {
        res.status(404).json({ message: "Proposal not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createProposta: async (req, res) => {
    try {
      const {
        ID_DEPARTAMENTO,
        ID_TIPO_PROPOSTA,
        ID_EMPRESA,
        DESCRICAO_PROPOSTA,
        NOME_PROPOSTA,
        competencias,
      } = req.body;

      // Validate required fields
      if (
        !ID_DEPARTAMENTO ||
        !ID_TIPO_PROPOSTA ||
        !ID_EMPRESA ||
        !DESCRICAO_PROPOSTA ||
        !NOME_PROPOSTA
      ) {
        return res.status(400).json({
          message: "Missing required fields. All fields are required.",
        });
      }

      // Check if departamento exists
      const departamento = await models.departamentos.findByPk(ID_DEPARTAMENTO);
      if (!departamento) {
        return res.status(404).json({ message: "Department not found" });
      }

      // Check if tipo_proposta exists
      const tipoProposta = await models.tipo_proposta.findByPk(
        ID_TIPO_PROPOSTA
      );
      if (!tipoProposta) {
        return res.status(404).json({ message: "Proposal type not found" });
      }

      // Check if empresa exists
      const empresa = await models.empresas.findByPk(ID_EMPRESA);
      if (!empresa) {
        return res.status(404).json({ message: "Company not found" });
      }

      // Create the proposta
      const newProposta = await models.propostas.create({
        id_departamento: ID_DEPARTAMENTO,
        id_tipo_proposta: ID_TIPO_PROPOSTA,
        id_empresa: ID_EMPRESA,
        descricao_proposta: DESCRICAO_PROPOSTA,
        nome_proposta: NOME_PROPOSTA,
      });

      // Add competencias if provided
      if (competencias && competencias.length > 0) {
        // First verify that all competencias exist
        const competenciaIds = competencias.map((comp) => comp.ID_COMPETENCIA);
        const existingCompetencias = await models.competencias.findAll({
          where: {
            id_competencia: competenciaIds,
          },
        });

        if (existingCompetencias.length !== competenciaIds.length) {
          // Some competencias don't exist
          await newProposta.destroy(); // Rollback the proposal creation
          return res.status(400).json({
            message: "One or more competencias do not exist in the database",
          });
        }

        // All competencias exist, create associations
        const competenciasPromises = competencias.map(async (comp) => {
          return await models.proposta_competencias.create({
            id_proposta: newProposta.id_proposta,
            id_competencia: comp.ID_COMPETENCIA,
          });
        });

        await Promise.all(competenciasPromises);
      }

      // Fetch the created proposta with all its associations
      const createdProposta = await models.propostas.findByPk(
        newProposta.id_proposta,
        {
          include: [
            {
              model: models.empresas,
              as: "id_empresa_empresa",
            },
            {
              model: models.departamentos,
              as: "id_departamento_departamento",
            },
            {
              model: models.tipo_proposta,
              as: "id_tipo_proposta_tipo_propostum",
            },
            {
              model: models.competencias,
              as: "id_competencia_competencias_proposta_competencia",
            },
          ],
        }
      );

      res.status(201).json(createdProposta);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateProposta: async (req, res) => {
    try {
      const {
        ID_DEPARTAMENTO,
        ID_TIPO_PROPOSTA,
        ID_EMPRESA,
        DESCRICAO_PROPOSTA,
        NOME_PROPOSTA,
        competencias,
      } = req.body;
      const propostaId = req.params.id;

      // Check if the proposta exists
      const proposta = await models.propostas.findByPk(propostaId);
      if (!proposta) {
        return res.status(404).json({ message: "Proposal not found" });
      }

      // Validate departamento if provided
      if (ID_DEPARTAMENTO) {
        const departamento = await models.departamentos.findByPk(
          ID_DEPARTAMENTO
        );
        if (!departamento) {
          return res.status(404).json({ message: "Department not found" });
        }
      }

      // Validate tipo_proposta if provided
      if (ID_TIPO_PROPOSTA) {
        const tipoProposta = await models.tipo_proposta.findByPk(
          ID_TIPO_PROPOSTA
        );
        if (!tipoProposta) {
          return res.status(404).json({ message: "Proposal type not found" });
        }
      }

      // Validate empresa if provided
      if (ID_EMPRESA) {
        const empresa = await models.empresas.findByPk(ID_EMPRESA);
        if (!empresa) {
          return res.status(404).json({ message: "Company not found" });
        }
      }

      // Update proposta fields
      const updateFields = {};
      if (ID_DEPARTAMENTO) updateFields.id_departamento = ID_DEPARTAMENTO;
      if (ID_TIPO_PROPOSTA) updateFields.id_tipo_proposta = ID_TIPO_PROPOSTA;
      if (ID_EMPRESA) updateFields.id_empresa = ID_EMPRESA;
      if (DESCRICAO_PROPOSTA)
        updateFields.descricao_proposta = DESCRICAO_PROPOSTA;
      if (NOME_PROPOSTA) updateFields.nome_proposta = NOME_PROPOSTA;

      await proposta.update(updateFields);

      // Update competencias if provided
      if (competencias && competencias.length > 0) {
        // First verify that all competencias exist
        const competenciaIds = competencias.map((comp) => comp.ID_COMPETENCIA);
        const existingCompetencias = await models.competencias.findAll({
          where: {
            id_competencia: competenciaIds,
          },
        });

        if (existingCompetencias.length !== competenciaIds.length) {
          return res.status(400).json({
            message: "One or more competencias do not exist in the database",
          });
        }

        // Delete existing associations
        await models.proposta_competencias.destroy({
          where: { id_proposta: propostaId },
        });

        // Create new associations
        const competenciasPromises = competencias.map(async (comp) => {
          return await models.proposta_competencias.create({
            id_proposta: propostaId,
            id_competencia: comp.ID_COMPETENCIA,
          });
        });

        await Promise.all(competenciasPromises);
      }

      // Fetch the updated proposta with all its associations
      const updatedProposta = await models.propostas.findByPk(propostaId, {
        include: [
          {
            model: models.empresas,
            as: "id_empresa_empresa",
          },
          {
            model: models.departamentos,
            as: "id_departamento_departamento",
          },
          {
            model: models.tipo_proposta,
            as: "id_tipo_proposta_tipo_propostum",
          },
          {
            model: models.competencias,
            as: "id_competencia_competencias_proposta_competencia",
          },
        ],
      });

      res.json(updatedProposta);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteProposta: async (req, res) => {
    try {
      const propostaId = req.params.id;

      // Check if the proposta exists
      const proposta = await models.propostas.findByPk(propostaId);
      if (!proposta) {
        return res.status(404).json({ message: "Proposal not found" });
      }

      // Delete associated competencias first
      await models.proposta_competencias.destroy({
        where: { id_proposta: propostaId },
      });

      // Delete any associated notifications
      await models.notificacoes_personalizadas.destroy({
        where: { id_proposta: propostaId },
      });

      // Delete the proposta
      await proposta.destroy();

      res.json({ message: "Proposal deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addCompetencia: async (req, res) => {
    try {
      const propostaId = req.params.id;
      const { ID_COMPETENCIA } = req.body;

      // Check if the proposta exists
      const proposta = await models.propostas.findByPk(propostaId);
      if (!proposta) {
        return res.status(404).json({ message: "Proposal not found" });
      }

      // Check if the competencia exists
      const competencia = await models.competencias.findByPk(ID_COMPETENCIA);
      if (!competencia) {
        return res.status(404).json({ message: "Competencia not found" });
      }

      // Check if the association already exists
      const existingAssoc = await models.proposta_competencias.findOne({
        where: {
          id_proposta: propostaId,
          id_competencia: ID_COMPETENCIA,
        },
      });

      if (existingAssoc) {
        return res
          .status(400)
          .json({ message: "Proposal already has this competencia" });
      }

      // Create the association
      await models.proposta_competencias.create({
        id_proposta: propostaId,
        id_competencia: ID_COMPETENCIA,
      });

      // Fetch the updated proposta
      const updatedProposta = await models.propostas.findByPk(propostaId, {
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencias_proposta_competencia",
          },
        ],
      });

      res.json(updatedProposta);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  removeCompetencia: async (req, res) => {
    try {
      const propostaId = req.params.id;
      const competenciaId = req.params.competenciaId;

      // Check if the association exists
      const association = await models.proposta_competencias.findOne({
        where: {
          id_proposta: propostaId,
          id_competencia: competenciaId,
        },
      });

      if (!association) {
        return res
          .status(404)
          .json({ message: "Proposal does not have this competencia" });
      }

      // Remove the association
      await association.destroy();

      // Fetch the updated proposta
      const updatedProposta = await models.propostas.findByPk(propostaId, {
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencias_proposta_competencia",
          },
        ],
      });

      res.json(updatedProposta);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPropostasByCompetencia: async (req, res) => {
    try {
      const competenciaId = req.params.competenciaId;

      // Check if the competencia exists
      const competencia = await models.competencias.findByPk(competenciaId);
      if (!competencia) {
        return res.status(404).json({ message: "Competencia not found" });
      }

      // Find all propostas with this competencia
      const propostas = await models.propostas.findAll({
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencias_proposta_competencia",
            where: { id_competencia: competenciaId },
          },
          {
            model: models.empresas,
            as: "id_empresa_empresa",
          },
          {
            model: models.departamentos,
            as: "id_departamento_departamento",
          },
          {
            model: models.tipo_proposta,
            as: "id_tipo_proposta_tipo_propostum",
          },
        ],
      });

      res.json(propostas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = propostasController;

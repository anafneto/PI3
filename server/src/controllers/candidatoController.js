const { models } = require("../config/db");

const candidatoController = {
  getAllCandidatos: async (req, res) => {
    try {
      const candidatos = await models.candidatos.findAll({
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencia",
          },
        ],
      });
      res.json(candidatos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCandidatoById: async (req, res) => {
    try {
      const candidato = await models.candidatos.findByPk(req.params.id, {
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencia",
          },
        ],
      });
      if (candidato) {
        res.json(candidato);
      } else {
        res.status(404).json({ message: "Candidate not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createCandidato: async (req, res) => {
    try {
      const { NR_MECANOGRAFICO, PASSWORD_CANDIDATO, DIPLOMADO, competencias } =
        req.body;

      // Create the candidate
      const newCandidato = await models.candidatos.create({
        nr_mecanografico: NR_MECANOGRAFICO,
        password_candidato: PASSWORD_CANDIDATO,
        diplomado: DIPLOMADO,
      });

      // Add competencias if provided
      if (competencias && competencias.length > 0) {
        // Get or create competencias and associate them
        const competenciasPromises = competencias.map(async (comp) => {
          return await models.candidato_competencias.create({
            nr_mecanografico: newCandidato.nr_mecanografico,
            id_competencia: comp.ID_COMPETENCIA,
          });
        });

        await Promise.all(competenciasPromises);
      }

      // Fetch the created candidate with its associations
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

      res.status(201).json(createdCandidato);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateCandidato: async (req, res) => {
    try {
      const { PASSWORD_CANDIDATO, DIPLOMADO, competencias } = req.body;
      const candidatoId = req.params.id;

      // Check if the candidate exists
      const candidato = await models.candidatos.findByPk(candidatoId);
      if (!candidato) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      // Update candidate fields
      const updateFields = {};
      if (PASSWORD_CANDIDATO)
        updateFields.password_candidato = PASSWORD_CANDIDATO;
      if (DIPLOMADO !== undefined) updateFields.diplomado = DIPLOMADO;

      await candidato.update(updateFields);

      // Update competencias if provided
      if (competencias && competencias.length > 0) {
        // Delete existing associations
        await models.candidato_competencias.destroy({
          where: { nr_mecanografico: candidatoId },
        });

        // Create new associations
        const competenciasPromises = competencias.map(async (comp) => {
          return await models.candidato_competencias.create({
            nr_mecanografico: candidatoId,
            id_competencia: comp.ID_COMPETENCIA,
          });
        });

        await Promise.all(competenciasPromises);
      }

      // Fetch the updated candidate with its associations
      const updatedCandidato = await models.candidatos.findByPk(candidatoId, {
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencia",
          },
        ],
      });

      res.json(updatedCandidato);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteCandidato: async (req, res) => {
    try {
      const candidatoId = req.params.id;

      // Check if the candidate exists
      const candidato = await models.candidatos.findByPk(candidatoId);
      if (!candidato) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      // Delete associated records first
      await models.candidato_competencias.destroy({
        where: { nr_mecanografico: candidatoId },
      });

      // Delete the candidate
      await candidato.destroy();

      res.json({ message: "Candidate deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addCompetencia: async (req, res) => {
    try {
      const candidatoId = req.params.id;
      const { ID_COMPETENCIA } = req.body;

      // Check if the candidate exists
      const candidato = await models.candidatos.findByPk(candidatoId);
      if (!candidato) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      // Check if the competencia exists
      const competencia = await models.competencias.findByPk(ID_COMPETENCIA);
      if (!competencia) {
        return res.status(404).json({ message: "Competencia not found" });
      }

      // Check if the association already exists
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

      // Create the association
      await models.candidato_competencias.create({
        nr_mecanografico: candidatoId,
        id_competencia: ID_COMPETENCIA,
      });

      // Fetch the updated candidate
      const updatedCandidato = await models.candidatos.findByPk(candidatoId, {
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencia",
          },
        ],
      });

      res.json(updatedCandidato);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  removeCompetencia: async (req, res) => {
    try {
      const candidatoId = req.params.id;
      const competenciaId = req.params.competenciaId;

      // Check if the association exists
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

      // Remove the association
      await association.destroy();

      // Fetch the updated candidate
      const updatedCandidato = await models.candidatos.findByPk(candidatoId, {
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencia",
          },
        ],
      });

      res.json(updatedCandidato);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = candidatoController;

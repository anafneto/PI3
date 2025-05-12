const { models } = require("../config/db");

const competenciaController = {
  getAllCompetencias: async (req, res) => {
    try {
      const competencias = await models.competencias.findAll();
      res.json(competencias);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCompetenciaById: async (req, res) => {
    try {
      const competencia = await models.competencias.findByPk(req.params.id);
      if (competencia) {
        res.json(competencia);
      } else {
        res.status(404).json({ message: "Competencia not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createCompetencia: async (req, res) => {
    try {
      const { NOME_COMPETENCIA } = req.body;

      if (!NOME_COMPETENCIA) {
        return res
          .status(400)
          .json({ message: "NOME_COMPETENCIA is required" });
      }

      // Fix: Use the correct field name matching your model
      const newCompetencia = await models.competencias.create({
        nome_competencia: NOME_COMPETENCIA,
      });

      res.status(201).json(newCompetencia);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateCompetencia: async (req, res) => {
    try {
      const { NOME_COMPETENCIA } = req.body;
      const competenciaId = req.params.id;

      // Check if the competencia exists
      const competencia = await models.competencias.findByPk(competenciaId);
      if (!competencia) {
        return res.status(404).json({ message: "Competencia not found" });
      }

      // Update competencia fields
      await competencia.update({ nome_competencia: NOME_COMPETENCIA });

      res.json(competencia);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteCompetencia: async (req, res) => {
    try {
      const competenciaId = req.params.id;

      // Check if the competencia exists
      const competencia = await models.competencias.findByPk(competenciaId);
      if (!competencia) {
        return res.status(404).json({ message: "Competencia not found" });
      }

      // Check if the competencia is in use
      const inUse = await models.candidato_competencias.findOne({
        where: { id_competencia: competenciaId }, // Changed to lowercase
      });

      if (inUse) {
        return res.status(400).json({
          message:
            "Cannot delete - this competencia is associated with one or more candidates",
        });
      }

      // Delete the competencia
      await competencia.destroy();

      res.json({ message: "Competencia deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCandidatosByCompetencia: async (req, res) => {
    try {
      const competenciaId = req.params.id;

      // Check if the competencia exists
      const competencia = await models.competencias.findByPk(competenciaId);
      if (!competencia) {
        return res.status(404).json({ message: "Competencia not found" });
      }

      // Find all candidates with this competencia
      const candidatos = await models.candidatos.findAll({
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencia", // This is the correct alias
            where: { id_competencia: competenciaId },
          },
        ],
      });

      res.json(candidatos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = competenciaController;

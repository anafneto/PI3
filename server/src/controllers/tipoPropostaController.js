const { models } = require("../config/db");

const tipoPropostaController = {
  getAllTipoPropostas: async (req, res) => {
    try {
      const tiposPropostas = await models.tipo_proposta.findAll({
        order: [["id_tipo_proposta", "ASC"]],
      });
      res.json(tiposPropostas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  initializeTipoPropostas: async (req, res) => {
    try {
      // Define the default tipos
      const defaultTipos = [
        { nome_tipo: "Remoto" },
        { nome_tipo: "Part Time" },
        { nome_tipo: "Full Time" },
        { nome_tipo: "Estágio" },
      ];

      // Check if there are any existing tipos
      const existingCount = await models.tipo_proposta.count();

      if (existingCount === 0) {
        // Create the default tipos if none exist
        await models.tipo_proposta.bulkCreate(defaultTipos);
        return res.status(201).json({
          message: "Default proposal types created successfully",
          tipos: await models.tipo_proposta.findAll(),
        });
      } else {
        return res.status(200).json({
          message: "Proposal types already exist",
          tipos: await models.tipo_proposta.findAll(),
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTipoPropostaById: async (req, res) => {
    try {
      const tipo = await models.tipo_proposta.findByPk(req.params.id);
      if (tipo) {
        res.json(tipo);
      } else {
        res.status(404).json({ message: "Proposal type not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Helper method to ensure proposal types exist when server starts
  ensureTypesExist: async () => {
    try {
      const defaultTipos = [
        { nome_tipo: "Remoto" },
        { nome_tipo: "Part Time" },
        { nome_tipo: "Full Time" },
        { nome_tipo: "Estágio" },
      ];

      // Check if there are any existing tipos
      const existingCount = await models.tipo_proposta.count();

      if (existingCount === 0) {
        // Create the default tipos if none exist
        await models.tipo_proposta.bulkCreate(defaultTipos);
        console.log("Default proposal types created successfully");
      }
    } catch (error) {
      console.error("Error initializing proposal types:", error);
    }
  },
};

module.exports = tipoPropostaController;

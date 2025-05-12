const { models } = require("../config/db");

const empresaController = {
  getAllEmpresas: async (req, res) => {
    try {
      const empresas = await models.empresas.findAll({
        include: [models.competencias],
      });
      res.json(empresas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getEmpresaById: async (req, res) => {
    try {
      const empresa = await models.empresas.findByPk(req.params.id, {
        include: [models.competencias],
      });
      if (empresa) {
        res.json(empresa);
      } else {
        res.status(404).json({ message: "Candidate not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Continue
};

module.exports = empresaController;

const { models } = require("../config/db");

const empresaController = {
  getAllEmpresas: async (req, res) => {
    try {
      const empresas = await models.empresas.findAll();
      res.json(empresas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getEmpresaById: async (req, res) => {
    try {
      const empresa = await models.empresas.findByPk(req.params.id);
      if (empresa) {
        res.json(empresa);
      } else {
        res.status(404).json({ message: "Empresa not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createEmpresa: async (req, res) => {
    try {
      const { NIF_EMPRESA, PASSWORD_EMPRESA, EMAIL_EMPRESA } = req.body;

      // Check if a company with this NIF already exists
      const existingEmpresa = await models.empresas.findOne({
        where: { nif_empresa: NIF_EMPRESA },
      });

      if (existingEmpresa) {
        return res
          .status(400)
          .json({ message: "An empresa with this NIF already exists" });
      }

      // Create the empresa
      const newEmpresa = await models.empresas.create({
        nif_empresa: NIF_EMPRESA,
        password_empresa: PASSWORD_EMPRESA,
        email_empresa: EMAIL_EMPRESA,
      });

      res.status(201).json(newEmpresa);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateEmpresa: async (req, res) => {
    try {
      const { NIF_EMPRESA, PASSWORD_EMPRESA, EMAIL_EMPRESA } = req.body;
      const empresaId = req.params.id;

      // Check if the empresa exists
      const empresa = await models.empresas.findByPk(empresaId);
      if (!empresa) {
        return res.status(404).json({ message: "Empresa not found" });
      }

      // Update empresa fields
      const updateFields = {};
      if (NIF_EMPRESA) updateFields.nif_empresa = NIF_EMPRESA;
      if (PASSWORD_EMPRESA) updateFields.password_empresa = PASSWORD_EMPRESA;
      if (EMAIL_EMPRESA) updateFields.email_empresa = EMAIL_EMPRESA;

      await empresa.update(updateFields);

      // Fetch the updated empresa
      const updatedEmpresa = await models.empresas.findByPk(empresaId);

      res.json(updatedEmpresa);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteEmpresa: async (req, res) => {
    try {
      const empresaId = req.params.id;

      // Check if the empresa exists
      const empresa = await models.empresas.findByPk(empresaId);
      if (!empresa) {
        return res.status(404).json({ message: "Empresa not found" });
      }

      // Check if the empresa has any associated propostas
      const propostas = await models.propostas.findAll({
        where: { id_empresa: empresaId },
      });

      if (propostas.length > 0) {
        return res.status(400).json({
          message:
            "Cannot delete empresa with associated propostas. Delete propostas first.",
        });
      }

      // Delete the empresa
      await empresa.destroy();

      res.json({ message: "Empresa deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPropostasByEmpresa: async (req, res) => {
    try {
      const empresaId = req.params.id;

      // Check if the empresa exists
      const empresa = await models.empresas.findByPk(empresaId);
      if (!empresa) {
        return res.status(404).json({ message: "Empresa not found" });
      }

      // Get all propostas for this empresa
      const propostas = await models.propostas.findAll({
        where: { id_empresa: empresaId },
        include: [
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
};

module.exports = empresaController;

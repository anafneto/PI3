const { models } = require("../config/db");

const departamentoController = {
  getAllDepartamentos: async (req, res) => {
    try {
      const departamentos = await models.departamentos.findAll();
      res.json(departamentos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getDepartamentoById: async (req, res) => {
    try {
      const departamento = await models.departamentos.findByPk(req.params.id);
      if (departamento) {
        res.json(departamento);
      } else {
        res.status(404).json({ message: "Departamento not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createDepartamento: async (req, res) => {
    try {
      const { NOME_DEPARTAMENTO } = req.body;

      if (!NOME_DEPARTAMENTO) {
        return res
          .status(400)
          .json({ message: "NOME_DEPARTAMENTO is required" });
      }

      // Create the departamento
      const newDepartamento = await models.departamentos.create({
        nome_departamento: NOME_DEPARTAMENTO,
      });

      res.status(201).json(newDepartamento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateDepartamento: async (req, res) => {
    try {
      const { NOME_DEPARTAMENTO } = req.body;
      const departamentoId = req.params.id;

      // Check if the departamento exists
      const departamento = await models.departamentos.findByPk(departamentoId);
      if (!departamento) {
        return res.status(404).json({ message: "Departamento not found" });
      }

      // Update departamento fields
      if (!NOME_DEPARTAMENTO) {
        return res
          .status(400)
          .json({ message: "NOME_DEPARTAMENTO is required" });
      }

      await departamento.update({ nome_departamento: NOME_DEPARTAMENTO });

      // Fetch the updated departamento
      const updatedDepartamento = await models.departamentos.findByPk(
        departamentoId
      );

      res.json(updatedDepartamento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteDepartamento: async (req, res) => {
    try {
      const departamentoId = req.params.id;

      // Check if the departamento exists
      const departamento = await models.departamentos.findByPk(departamentoId);
      if (!departamento) {
        return res.status(404).json({ message: "Departamento not found" });
      }

      // Check if the departamento has any gestores associated
      const gestores = await models.gestores.findAll({
        where: { id_departamento: departamentoId },
      });

      if (gestores.length > 0) {
        return res.status(400).json({
          message:
            "Cannot delete departamento with associated gestores. Delete gestores first.",
        });
      }

      // Check if the departamento has any propostas associated
      const propostas = await models.propostas.findAll({
        where: { id_departamento: departamentoId },
      });

      if (propostas.length > 0) {
        return res.status(400).json({
          message:
            "Cannot delete departamento with associated propostas. Delete propostas first.",
        });
      }

      // Delete the departamento
      await departamento.destroy();

      res.json({ message: "Departamento deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getGestoresByDepartamento: async (req, res) => {
    try {
      const departamentoId = req.params.id;

      // Check if the departamento exists
      const departamento = await models.departamentos.findByPk(departamentoId);
      if (!departamento) {
        return res.status(404).json({ message: "Departamento not found" });
      }

      // Get all gestores for this departamento
      const gestores = await models.gestores.findAll({
        where: { id_departamento: departamentoId },
      });

      res.json(gestores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPropostasByDepartamento: async (req, res) => {
    try {
      const departamentoId = req.params.id;

      // Check if the departamento exists
      const departamento = await models.departamentos.findByPk(departamentoId);
      if (!departamento) {
        return res.status(404).json({ message: "Departamento not found" });
      }

      // Get all propostas for this departamento
      const propostas = await models.propostas.findAll({
        where: { id_departamento: departamentoId },
        include: [
          {
            model: models.empresas,
            as: "id_empresa_empresa",
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

module.exports = departamentoController;

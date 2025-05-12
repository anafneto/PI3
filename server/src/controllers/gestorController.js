const { models } = require("../config/db");

const gestorController = {
  getAllGestores: async (req, res) => {
    try {
      const gestores = await models.gestores.findAll({
        include: [
          {
            model: models.departamentos,
            as: "id_departamento_departamento",
          },
        ],
      });
      res.json(gestores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getGestorById: async (req, res) => {
    try {
      const gestor = await models.gestores.findByPk(req.params.id, {
        include: [
          {
            model: models.departamentos,
            as: "id_departamento_departamento",
          },
        ],
      });
      if (gestor) {
        res.json(gestor);
      } else {
        res.status(404).json({ message: "Gestor not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createGestor: async (req, res) => {
    try {
      const { ID_DEPARTAMENTO, USERNAME_GESTOR, PASSWORD_GESTOR } = req.body;

      // Check if department exists
      const departamento = await models.departamentos.findByPk(ID_DEPARTAMENTO);
      if (!departamento) {
        return res.status(404).json({ message: "Department not found" });
      }

      // Check if username is already taken
      const existingGestor = await models.gestores.findOne({
        where: { username_gestor: USERNAME_GESTOR },
      });

      if (existingGestor) {
        return res.status(400).json({
          message: "Username already taken",
        });
      }

      // Create the gestor
      const newGestor = await models.gestores.create({
        id_departamento: ID_DEPARTAMENTO,
        username_gestor: USERNAME_GESTOR,
        password_gestor: PASSWORD_GESTOR, // In a real app, you should hash this password
      });

      // Get the complete gestor with department info
      const createdGestor = await models.gestores.findByPk(
        newGestor.id_gestor,
        {
          include: [
            {
              model: models.departamentos,
              as: "id_departamento_departamento",
            },
          ],
        }
      );

      res.status(201).json(createdGestor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateGestor: async (req, res) => {
    try {
      const { ID_DEPARTAMENTO, USERNAME_GESTOR, PASSWORD_GESTOR } = req.body;
      const gestorId = req.params.id;

      // Check if the gestor exists
      const gestor = await models.gestores.findByPk(gestorId);
      if (!gestor) {
        return res.status(404).json({ message: "Gestor not found" });
      }

      // Check if department exists if provided
      if (ID_DEPARTAMENTO) {
        const departamento = await models.departamentos.findByPk(
          ID_DEPARTAMENTO
        );
        if (!departamento) {
          return res.status(404).json({ message: "Department not found" });
        }
      }

      // Check if username is already taken by another gestor
      if (USERNAME_GESTOR) {
        const existingGestor = await models.gestores.findOne({
          where: { username_gestor: USERNAME_GESTOR },
        });

        if (existingGestor && existingGestor.id_gestor !== parseInt(gestorId)) {
          return res.status(400).json({
            message: "Username already taken by another gestor",
          });
        }
      }

      // Update gestor fields
      const updateFields = {};
      if (ID_DEPARTAMENTO) updateFields.id_departamento = ID_DEPARTAMENTO;
      if (USERNAME_GESTOR) updateFields.username_gestor = USERNAME_GESTOR;
      if (PASSWORD_GESTOR) updateFields.password_gestor = PASSWORD_GESTOR;

      await gestor.update(updateFields);

      // Fetch the updated gestor with department info
      const updatedGestor = await models.gestores.findByPk(gestorId, {
        include: [
          {
            model: models.departamentos,
            as: "id_departamento_departamento",
          },
        ],
      });

      res.json(updatedGestor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteGestor: async (req, res) => {
    try {
      const gestorId = req.params.id;

      // Check if the gestor exists
      const gestor = await models.gestores.findByPk(gestorId);
      if (!gestor) {
        return res.status(404).json({ message: "Gestor not found" });
      }

      // Delete the gestor
      await gestor.destroy();

      res.json({ message: "Gestor deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getGestoresByDepartamento: async (req, res) => {
    try {
      const departamentoId = req.params.departamentoId;

      // Check if the departamento exists
      const departamento = await models.departamentos.findByPk(departamentoId);
      if (!departamento) {
        return res.status(404).json({ message: "Department not found" });
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
};

module.exports = gestorController;

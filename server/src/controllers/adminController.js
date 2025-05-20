
const { models } = require("../config/db"); // Importa os modelos Sequelize para acesso à base de dados

const adminController = {
  // Método para obter todos os administradores
  getAllAdmins: async (req, res) => {
    try {
      const admins = await models.admin.findAll();
      res.json(admins);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter um administrador específico pelo seu ID
  getAdminById: async (req, res) => {
    try {
      const admin = await models.admin.findByPk(req.params.id);
      if (admin) {
        res.json(admin);
      } else {
        res.status(404).json({ message: "Admin não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Método para criar um novo administrador
  createAdmin: async (req, res) => {
    try {
      const { USERNAME_ADMIN, PASSWORD_ADMIN } = req.body;

      // Validação básica
      if (!USERNAME_ADMIN || !PASSWORD_ADMIN) {
        return res.status(400).json({ message: "Username e password são necessários." });
      }

      const newAdmin = await models.admin.create({
        username_admin: USERNAME_ADMIN,
        password_admin: PASSWORD_ADMIN, // NOTA: Deveria ser encriptada numa app real
      });

      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Método para atualizar um administrador existente
  updateAdmin: async (req, res) => {
    try {
      const { USERNAME_ADMIN, PASSWORD_ADMIN } = req.body;
      const adminId = req.params.id;

      const admin = await models.admin.findByPk(adminId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      const updateFields = {};
      if (USERNAME_ADMIN) updateFields.username_admin = USERNAME_ADMIN;
      if (PASSWORD_ADMIN) updateFields.password_admin = PASSWORD_ADMIN;

      await admin.update(updateFields);

      res.json(admin);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Método para eliminar um administrador
  deleteAdmin: async (req, res) => {
    try {
      const adminId = req.params.id;

      const admin = await models.admin.findByPk(adminId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      await admin.destroy();

      res.json({ message: "Admin deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = adminController;

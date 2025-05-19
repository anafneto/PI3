// Controlador de Gestores
// Este ficheiro implementa as operações CRUD para gestores de departamentos

const { models } = require("../config/db"); // Importa os modelos da base de dados

const gestorController = {
  // Método para obter todos os gestores com informações do departamento associado
  getAllGestores: async (req, res) => {
    try {
      // Obtém todos os gestores incluindo o modelo de departamento associado
      // O 'include' permite fazer um JOIN automático na consulta SQL
      const gestores = await models.gestores.findAll({
        include: [
          {
            model: models.departamentos,
            as: "id_departamento_departamento", // Nome da associação definido no modelo
          },
        ],
      });
      // Devolve os gestores como resposta JSON
      res.json(gestores);
    } catch (error) {
      // Em caso de erro, devolve um código 500 (erro interno do servidor)
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter um gestor específico pelo seu ID
  getGestorById: async (req, res) => {
    try {
      // Procura o gestor pelo ID e inclui o departamento associado
      const gestor = await models.gestores.findByPk(req.params.id, {
        include: [
          {
            model: models.departamentos,
            as: "id_departamento_departamento",
          },
        ],
      });
      // Se o gestor for encontrado, devolve-o
      if (gestor) {
        res.json(gestor);
      } else {
        // Se não for encontrado, devolve um erro 404 (não encontrado)
        res.status(404).json({ message: "Gestor not found" });
      }
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },

  // Método para criar um novo gestor
  createGestor: async (req, res) => {
    try {
      // Extrai os dados necessários do corpo do pedido
      const { ID_DEPARTAMENTO, USERNAME_GESTOR, PASSWORD_GESTOR } = req.body;

      // Verifica se o departamento existe
      const departamento = await models.departamentos.findByPk(ID_DEPARTAMENTO);
      if (!departamento) {
        return res.status(404).json({ message: "Department not found" });
      }

      // Verifica se o nome de utilizador já está em uso
      const existingGestor = await models.gestores.findOne({
        where: { username_gestor: USERNAME_GESTOR },
      });

      if (existingGestor) {
        return res.status(400).json({
          message: "Username already taken",
        });
      }

      // Cria o gestor na base de dados
      // NOTA: Numa aplicação real, a password deveria ser encriptada antes de ser guardada
      const newGestor = await models.gestores.create({
        id_departamento: ID_DEPARTAMENTO,
        username_gestor: USERNAME_GESTOR,
        password_gestor: PASSWORD_GESTOR, // Deveria ser encriptada
      });

      // Obtém o gestor completo com as informações do departamento
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

      // Devolve o gestor criado com código 201 (created)
      res.status(201).json(createdGestor);
    } catch (error) {
      // Em caso de erro, devolve um código 400 (bad request)
      res.status(400).json({ message: error.message });
    }
  },

  // Método para atualizar um gestor existente
  updateGestor: async (req, res) => {
    try {
      // Extrai os dados do corpo do pedido e o ID do gestor
      const { ID_DEPARTAMENTO, USERNAME_GESTOR, PASSWORD_GESTOR } = req.body;
      const gestorId = req.params.id;

      // Verifica se o gestor existe
      const gestor = await models.gestores.findByPk(gestorId);
      if (!gestor) {
        return res.status(404).json({ message: "Gestor not found" });
      }

      // Se foi fornecido um ID de departamento, verifica se esse departamento existe
      if (ID_DEPARTAMENTO) {
        const departamento = await models.departamentos.findByPk(
          ID_DEPARTAMENTO
        );
        if (!departamento) {
          return res.status(404).json({ message: "Department not found" });
        }
      }

      // Se foi fornecido um nome de utilizador, verifica se já está em uso por outro gestor
      if (USERNAME_GESTOR) {
        const existingGestor = await models.gestores.findOne({
          where: { username_gestor: USERNAME_GESTOR },
        });

        // Se o nome de utilizador já existe E pertence a um gestor diferente
        if (existingGestor && existingGestor.id_gestor !== parseInt(gestorId)) {
          return res.status(400).json({
            message: "Username already taken by another gestor",
          });
        }
      }

      // Prepara os campos para atualização
      // Só inclui campos que foram fornecidos no pedido
      const updateFields = {};
      if (ID_DEPARTAMENTO) updateFields.id_departamento = ID_DEPARTAMENTO;
      if (USERNAME_GESTOR) updateFields.username_gestor = USERNAME_GESTOR;
      if (PASSWORD_GESTOR) updateFields.password_gestor = PASSWORD_GESTOR;

      // Atualiza o gestor com os novos campos
      await gestor.update(updateFields);

      // Obtém o gestor atualizado com as informações do departamento
      const updatedGestor = await models.gestores.findByPk(gestorId, {
        include: [
          {
            model: models.departamentos,
            as: "id_departamento_departamento",
          },
        ],
      });

      // Devolve o gestor atualizado
      res.json(updatedGestor);
    } catch (error) {
      // Em caso de erro, devolve um código 400
      res.status(400).json({ message: error.message });
    }
  },

  // Método para eliminar um gestor
  deleteGestor: async (req, res) => {
    try {
      const gestorId = req.params.id;

      // Verifica se o gestor existe
      const gestor = await models.gestores.findByPk(gestorId);
      if (!gestor) {
        return res.status(404).json({ message: "Gestor not found" });
      }

      // Elimina o gestor
      await gestor.destroy();

      // Devolve uma mensagem de sucesso
      res.json({ message: "Gestor deleted successfully" });
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter todos os gestores de um departamento específico
  getGestoresByDepartamento: async (req, res) => {
    try {
      const departamentoId = req.params.departamentoId;

      // Verifica se o departamento existe
      const departamento = await models.departamentos.findByPk(departamentoId);
      if (!departamento) {
        return res.status(404).json({ message: "Department not found" });
      }

      // Obtém todos os gestores do departamento especificado
      const gestores = await models.gestores.findAll({
        where: { id_departamento: departamentoId },
      });

      // Devolve os gestores encontrados
      res.json(gestores);
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },
};

// Exporta o controlador para ser utilizado noutras partes da aplicação
module.exports = gestorController;

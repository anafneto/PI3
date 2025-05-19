// Controlador de Departamentos
// Este ficheiro implementa as operações CRUD para a entidade Departamento e operações relacionadas

const { models } = require("../config/db"); // Importa os modelos Sequelize para acesso à base de dados

const departamentoController = {
  // Método para obter todos os departamentos
  getAllDepartamentos: async (req, res) => {
    try {
      // Obtém todos os departamentos da base de dados
      const departamentos = await models.departamentos.findAll();
      // Devolve os departamentos como JSON
      res.json(departamentos);
    } catch (error) {
      // Em caso de erro, devolve um código 500 (erro interno do servidor)
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter um departamento específico pelo seu ID
  getDepartamentoById: async (req, res) => {
    try {
      // Procura o departamento pelo ID fornecido nos parâmetros da URL
      const departamento = await models.departamentos.findByPk(req.params.id);
      if (departamento) {
        // Se o departamento for encontrado, devolve-o
        res.json(departamento);
      } else {
        // Se não for encontrado, devolve um erro 404 (não encontrado)
        res.status(404).json({ message: "Departamento not found" });
      }
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },

  // Método para criar um novo departamento
  createDepartamento: async (req, res) => {
    try {
      // Extrai o nome do departamento do corpo do pedido
      const { NOME_DEPARTAMENTO } = req.body;

      // Valida se o nome foi fornecido
      if (!NOME_DEPARTAMENTO) {
        return res
          .status(400)
          .json({ message: "NOME_DEPARTAMENTO is required" });
      }

      // Cria o departamento na base de dados
      const newDepartamento = await models.departamentos.create({
        nome_departamento: NOME_DEPARTAMENTO,
      });

      // Devolve o departamento criado com código 201 (created)
      res.status(201).json(newDepartamento);
    } catch (error) {
      // Em caso de erro, devolve um código 400 (bad request)
      res.status(400).json({ message: error.message });
    }
  },

  // Método para atualizar um departamento existente
  updateDepartamento: async (req, res) => {
    try {
      // Extrai o nome do departamento e o ID do departamento
      const { NOME_DEPARTAMENTO } = req.body;
      const departamentoId = req.params.id;

      // Verifica se o departamento existe
      const departamento = await models.departamentos.findByPk(departamentoId);
      if (!departamento) {
        return res.status(404).json({ message: "Departamento not found" });
      }

      // Valida se o novo nome foi fornecido
      if (!NOME_DEPARTAMENTO) {
        return res
          .status(400)
          .json({ message: "NOME_DEPARTAMENTO is required" });
      }

      // Atualiza o departamento com o novo nome
      await departamento.update({ nome_departamento: NOME_DEPARTAMENTO });

      // Obtém o departamento atualizado
      const updatedDepartamento = await models.departamentos.findByPk(
        departamentoId
      );

      // Devolve o departamento atualizado
      res.json(updatedDepartamento);
    } catch (error) {
      // Em caso de erro, devolve um código 400
      res.status(400).json({ message: error.message });
    }
  },

  // Método para eliminar um departamento
  deleteDepartamento: async (req, res) => {
    try {
      const departamentoId = req.params.id;

      // Verifica se o departamento existe
      const departamento = await models.departamentos.findByPk(departamentoId);
      if (!departamento) {
        return res.status(404).json({ message: "Departamento not found" });
      }

      // Verifica se o departamento tem gestores associados
      // Esta é uma validação importante para manter a integridade dos dados
      const gestores = await models.gestores.findAll({
        where: { id_departamento: departamentoId },
      });

      // Se houver gestores associados, não permite a eliminação do departamento
      if (gestores.length > 0) {
        return res.status(400).json({
          message:
            "Cannot delete departamento with associated gestores. Delete gestores first.",
        });
      }

      // Verifica se o departamento tem propostas associadas
      const propostas = await models.propostas.findAll({
        where: { id_departamento: departamentoId },
      });

      // Se houver propostas associadas, não permite a eliminação do departamento
      if (propostas.length > 0) {
        return res.status(400).json({
          message:
            "Cannot delete departamento with associated propostas. Delete propostas first.",
        });
      }

      // Elimina o departamento
      await departamento.destroy();

      // Devolve mensagem de sucesso
      res.json({ message: "Departamento deleted successfully" });
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter todos os gestores de um departamento específico
  getGestoresByDepartamento: async (req, res) => {
    try {
      const departamentoId = req.params.id;

      // Verifica se o departamento existe
      const departamento = await models.departamentos.findByPk(departamentoId);
      if (!departamento) {
        return res.status(404).json({ message: "Departamento not found" });
      }

      // Obtém todos os gestores deste departamento
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

  // Método para obter todas as propostas de um departamento específico
  getPropostasByDepartamento: async (req, res) => {
    try {
      const departamentoId = req.params.id;

      // Verifica se o departamento existe
      const departamento = await models.departamentos.findByPk(departamentoId);
      if (!departamento) {
        return res.status(404).json({ message: "Departamento not found" });
      }

      // Obtém todas as propostas deste departamento
      // Inclui informações relacionadas para fornecer dados mais completos
      const propostas = await models.propostas.findAll({
        where: { id_departamento: departamentoId },
        include: [
          // Inclui informação da empresa associada
          {
            model: models.empresas,
            as: "id_empresa_empresa",
          },
          // Inclui informação do tipo de proposta
          {
            model: models.tipo_proposta,
            as: "id_tipo_proposta_tipo_propostum",
          },
          // Inclui as competências associadas à proposta
          {
            model: models.competencias,
            as: "id_competencia_competencias_proposta_competencia",
          },
        ],
      });

      // Devolve as propostas encontradas
      res.json(propostas);
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },
};

// Exporta o controlador para ser utilizado noutras partes da aplicação
module.exports = departamentoController;

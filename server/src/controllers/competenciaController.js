// Controlador de Competências
// Este ficheiro implementa as operações CRUD para a entidade Competência e operações relacionadas

const { models } = require("../config/db"); // Importa os modelos Sequelize para acesso à base de dados

const competenciaController = {
  // Método para obter todas as competências
  getAllCompetencias: async (req, res) => {
    try {
      // Obtém todas as competências da base de dados
      const competencias = await models.competencias.findAll();
      // Devolve as competências como JSON
      res.json(competencias);
    } catch (error) {
      // Em caso de erro, devolve um código 500 (erro interno do servidor)
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter uma competência específica pelo seu ID
  getCompetenciaById: async (req, res) => {
    try {
      // Procura a competência pelo ID fornecido nos parâmetros da URL
      const competencia = await models.competencias.findByPk(req.params.id);
      if (competencia) {
        // Se a competência for encontrada, devolve-a
        res.json(competencia);
      } else {
        // Se não for encontrada, devolve um erro 404 (não encontrado)
        res.status(404).json({ message: "Competencia not found" });
      }
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },

  // Método para criar uma nova competência
  createCompetencia: async (req, res) => {
    try {
      // Extrai o nome da competência do corpo do pedido
      const { NOME_COMPETENCIA } = req.body;

      // Valida se o nome foi fornecido
      if (!NOME_COMPETENCIA) {
        return res
          .status(400)
          .json({ message: "NOME_COMPETENCIA is required" });
      }

      // Cria a competência na base de dados
      // Utiliza o nome do campo correto conforme definido no modelo
      const newCompetencia = await models.competencias.create({
        nome_competencia: NOME_COMPETENCIA,
      });

      // Devolve a competência criada com código 201 (created)
      res.status(201).json(newCompetencia);
    } catch (error) {
      // Em caso de erro, devolve um código 400 (bad request)
      res.status(400).json({ message: error.message });
    }
  },

  // Método para atualizar uma competência existente
  updateCompetencia: async (req, res) => {
    try {
      // Extrai o nome da competência e o ID da competência
      const { NOME_COMPETENCIA } = req.body;
      const competenciaId = req.params.id;

      // Verifica se a competência existe
      const competencia = await models.competencias.findByPk(competenciaId);
      if (!competencia) {
        return res.status(404).json({ message: "Competencia not found" });
      }

      // Atualiza a competência com o novo nome
      await competencia.update({ nome_competencia: NOME_COMPETENCIA });

      // Devolve a competência atualizada
      res.json(competencia);
    } catch (error) {
      // Em caso de erro, devolve um código 400
      res.status(400).json({ message: error.message });
    }
  },

  // Método para eliminar uma competência
  deleteCompetencia: async (req, res) => {
    try {
      const competenciaId = req.params.id;

      // Verifica se a competência existe
      const competencia = await models.competencias.findByPk(competenciaId);
      if (!competencia) {
        return res.status(404).json({ message: "Competencia not found" });
      }

      // Verifica se a competência está a ser utilizada por algum candidato
      // Esta é uma validação importante para manter a integridade dos dados
      const inUse = await models.candidato_competencias.findOne({
        where: { id_competencia: competenciaId },
      });

      // Se a competência estiver a ser utilizada, não permite a eliminação
      if (inUse) {
        return res.status(400).json({
          message:
            "Cannot delete - this competencia is associated with one or more candidates",
        });
      }

      // Elimina a competência
      await competencia.destroy();

      // Devolve mensagem de sucesso
      res.json({ message: "Competencia deleted successfully" });
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter todos os candidatos com uma competência específica
  // Este método é útil para encontrar candidatos que possuem determinada competência
  getCandidatosByCompetencia: async (req, res) => {
    try {
      const competenciaId = req.params.id;

      // Verifica se a competência existe
      const competencia = await models.competencias.findByPk(competenciaId);
      if (!competencia) {
        return res.status(404).json({ message: "Competencia not found" });
      }

      // Encontra todos os candidatos com esta competência
      // Utiliza o mecanismo de associação do Sequelize para fazer o JOIN
      const candidatos = await models.candidatos.findAll({
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencia", // Utiliza o alias correto definido no modelo
            where: { id_competencia: competenciaId }, // Filtra pela competência específica
          },
        ],
      });

      // Devolve os candidatos encontrados
      res.json(candidatos);
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },
};

// Exporta o controlador para ser utilizado noutras partes da aplicação
module.exports = competenciaController;

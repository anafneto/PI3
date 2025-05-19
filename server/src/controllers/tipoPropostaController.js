// Controlador para gestão dos tipos de proposta
// Este ficheiro é responsável por todas as operações relacionadas com os tipos de proposta

const { models } = require("../config/db"); // Importação dos modelos da base de dados

const tipoPropostaController = {
  // Método para obter todos os tipos de proposta
  // Retorna uma lista ordenada por ID de todos os tipos de proposta existentes na base de dados
  getAllTipoPropostas: async (req, res) => {
    try {
      // 'findAll' é um método do Sequelize que busca todos os registos de uma tabela
      // É equivalente a: SELECT * FROM tipo_proposta ORDER BY id_tipo_proposta ASC
      const tiposPropostas = await models.tipo_proposta.findAll({
        order: [["id_tipo_proposta", "ASC"]], // Define a ordenação dos resultados
      });
      res.json(tiposPropostas); // Devolve os resultados como JSON
    } catch (error) {
      // Em caso de erro, devolve um código 500 (erro interno do servidor)
      res.status(500).json({ message: error.message });
    }
  },

  // Método para inicializar os tipos de proposta predefinidos
  // Este método é chamado manualmente através de um endpoint da API
  initializeTipoPropostas: async (req, res) => {
    try {
      // Define uma lista de tipos de proposta predefinidos, conforme o que foi decidido em grupo
      const defaultTipos = [
        { nome_tipo: "Remoto" },
        { nome_tipo: "Part Time" },
        { nome_tipo: "Full Time" },
        { nome_tipo: "Estágio" },
      ];

      // Verifica se já existem tipos de proposta na base de dados
      // 'count' é um método do Sequelize que conta o número de registos numa tabela
      const existingCount = await models.tipo_proposta.count();

      if (existingCount === 0) {
        // Se não existirem tipos de proposta, cria os predefinidos
        // 'bulkCreate' é um método do Sequelize que permite criar múltiplos registos de uma só vez
        await models.tipo_proposta.bulkCreate(defaultTipos);

        // Devolve uma resposta com código 201 (criado com sucesso) e a lista dos tipos criados
        return res.status(201).json({
          message: "Default proposal types created successfully",
          tipos: await models.tipo_proposta.findAll(), // Encontra os tipos criados para devolver na resposta
        });
      } else {
        // Se já existirem tipos, devolve uma resposta com os tipos existentes
        return res.status(200).json({
          message: "Proposal types already exist",
          tipos: await models.tipo_proposta.findAll(),
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter um tipo de proposta específico pelo seu ID
  getTipoPropostaById: async (req, res) => {
    try {
      // 'findByPk' é um método do Sequelize que busca um registo pelo seu ID (Primary Key)
      // req.params.id contém o ID passado na URL do pedido (ex: /api/tipos-proposta/1)
      const tipo = await models.tipo_proposta.findByPk(req.params.id);

      if (tipo) {
        // Se o tipo foi encontrado, devolve-o como JSON
        res.json(tipo);
      } else {
        // Se o tipo não foi encontrado, devolve um erro 404 (não encontrado)
        res.status(404).json({ message: "Proposal type not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Método auxiliar para garantir que os tipos de proposta existem quando o servidor inicia
  // Este método é chamado automaticamente na inicialização do servidor
  ensureTypesExist: async () => {
    try {
      // Define os mesmos tipos de proposta predefinidos
      const defaultTipos = [
        { nome_tipo: "Remoto" },
        { nome_tipo: "Part Time" },
        { nome_tipo: "Full Time" },
        { nome_tipo: "Estágio" },
      ];

      // Verifica se já existem tipos de proposta
      const existingCount = await models.tipo_proposta.count();

      if (existingCount === 0) {
        // Se não existirem, cria os predefinidos
        await models.tipo_proposta.bulkCreate(defaultTipos);
        console.log("Default proposal types created successfully");
      }
      // Se já existirem tipos, não faz nada
    } catch (error) {
      console.error("Error initializing proposal types:", error);
    }
  },
};

// Exporta o controlador para ser usado noutras partes da aplicação
module.exports = tipoPropostaController;

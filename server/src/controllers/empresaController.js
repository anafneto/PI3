// Controlador de Empresas
// Este ficheiro implementa as operações CRUD para a entidade Empresa e operações relacionadas

const { models } = require("../config/db"); // Importa os modelos Sequelize para acesso à BD

const empresaController = {
  // Método para obter todas as empresas
  getAllEmpresas: async (req, res) => {
    try {
      // Obtém todas as empresas da base de dados
      const empresas = await models.empresas.findAll();
      // Devolve as empresas como JSON
      res.json(empresas);
    } catch (error) {
      // Em caso de erro, devolve um código 500 (erro interno do servidor)
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter uma empresa específica pelo seu ID
  getEmpresaById: async (req, res) => {
    try {
      // Procura a empresa pelo ID fornecido nos parâmetros da URL
      const empresa = await models.empresas.findByPk(req.params.id);
      if (empresa) {
        // Se a empresa for encontrada, devolve-a
        res.json(empresa);
      } else {
        // Se não for encontrada, devolve um erro 404 (não encontrado)
        res.status(404).json({ message: "Empresa not found" });
      }
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },

  // Método para criar uma nova empresa
  createEmpresa: async (req, res) => {
    try {
      // Extrai os dados necessários do corpo do pedido
      const { NIF_EMPRESA, PASSWORD_EMPRESA, EMAIL_EMPRESA } = req.body;

      // Verifica se já existe uma empresa com este NIF
      // O NIF é um identificador único para empresas em Portugal
      const existingEmpresa = await models.empresas.findOne({
        where: { nif_empresa: NIF_EMPRESA },
      });

      // Se já existir uma empresa com este NIF, devolve um erro
      if (existingEmpresa) {
        return res
          .status(400)
          .json({ message: "An empresa with this NIF already exists" });
      }

      // Cria a empresa na base de dados
      // NOTA: Numa aplicação real, a password deveria ser encriptada antes de ser guardada
      const newEmpresa = await models.empresas.create({
        nif_empresa: NIF_EMPRESA,
        password_empresa: PASSWORD_EMPRESA, // Deveria ser encriptada
        email_empresa: EMAIL_EMPRESA,
      });

      // Devolve a empresa criada com código 201 (created)
      res.status(201).json(newEmpresa);
    } catch (error) {
      // Em caso de erro, devolve um código 400 (bad request)
      res.status(400).json({ message: error.message });
    }
  },

  // Método para atualizar uma empresa existente
  updateEmpresa: async (req, res) => {
    try {
      // Extrai os dados do corpo do pedido e o ID da empresa
      const { NIF_EMPRESA, PASSWORD_EMPRESA, EMAIL_EMPRESA } = req.body;
      const empresaId = req.params.id;

      // Verifica se a empresa existe
      const empresa = await models.empresas.findByPk(empresaId);
      if (!empresa) {
        return res.status(404).json({ message: "Empresa not found" });
      }

      // Prepara os campos para atualização, apenas incluindo campos fornecidos
      const updateFields = {};
      if (NIF_EMPRESA) updateFields.nif_empresa = NIF_EMPRESA;
      if (PASSWORD_EMPRESA) updateFields.password_empresa = PASSWORD_EMPRESA;
      if (EMAIL_EMPRESA) updateFields.email_empresa = EMAIL_EMPRESA;

      // Atualiza a empresa com os novos campos
      await empresa.update(updateFields);

      // Obtém a empresa atualizada
      const updatedEmpresa = await models.empresas.findByPk(empresaId);

      // Devolve a empresa atualizada
      res.json(updatedEmpresa);
    } catch (error) {
      // Em caso de erro, devolve um código 400
      res.status(400).json({ message: error.message });
    }
  },

  // Método para eliminar uma empresa
  deleteEmpresa: async (req, res) => {
    try {
      const empresaId = req.params.id;

      // Verifica se a empresa existe
      const empresa = await models.empresas.findByPk(empresaId);
      if (!empresa) {
        return res.status(404).json({ message: "Empresa not found" });
      }

      // Verifica se a empresa possui propostas associadas
      // Esta é uma validação importante para manter a integridade dos dados
      const propostas = await models.propostas.findAll({
        where: { id_empresa: empresaId },
      });

      // Se houver propostas associadas, não permite a eliminação da empresa
      // Isto evita a violação das restrições de chave estrangeira e mantém os dados consistentes
      if (propostas.length > 0) {
        return res.status(400).json({
          message:
            "Cannot delete empresa with associated propostas. Delete propostas first.",
        });
      }

      // Elimina a empresa
      await empresa.destroy();

      // Devolve mensagem de sucesso
      res.json({ message: "Empresa deleted successfully" });
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter todas as propostas de uma empresa específica
  // Este é um método adicional útil que mostra a relação entre empresas e propostas
  getPropostasByEmpresa: async (req, res) => {
    try {
      const empresaId = req.params.id;

      // Verifica se a empresa existe
      const empresa = await models.empresas.findByPk(empresaId);
      if (!empresa) {
        return res.status(404).json({ message: "Empresa not found" });
      }

      // Obtém todas as propostas desta empresa
      // Inclui informações relacionadas para fornecer dados mais completos
      const propostas = await models.propostas.findAll({
        where: { id_empresa: empresaId }, // Filtra por ID da empresa
        include: [
          // Inclui informação do departamento associado
          {
            model: models.departamentos,
            as: "id_departamento_departamento",
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
module.exports = empresaController;

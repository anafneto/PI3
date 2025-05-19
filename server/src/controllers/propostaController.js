// Controlador de propostas
// Este ficheiro gere todas as operações relativas às propostas - CRUD

const { models } = require("../config/db"); // Importa os modelos Sequelize para acesso à base de dados
const notificacoesController = require("./notificacoesPersonalizadasController"); // Importa o controlador de notificações

const propostasController = {
  // Método para obter todas as propostas com os seus relacionamentos
  // Isto permite-nos ter informação completa sobre cada proposta numa única query
  getAllPropostas: async (req, res) => {
    try {
      // Utilizamos 'findAll' com 'include' para obter os dados relacionados
      // O parâmetro 'as' tem de corresponder exatamente ao nome definido nas associações do modelo
      const propostas = await models.propostas.findAll({
        include: [
          {
            model: models.empresas,
            as: "id_empresa_empresa", // Nome da relação definido no modelo
          },
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
            as: "id_competencia_competencias_proposta_competencia", // Relação many-to-many através da tabela de junção
          },
        ],
      });
      // Devolve o resultado como JSON
      res.json(propostas);
    } catch (error) {
      // Caso haja um erro, devolve um código 500 (erro interno do servidor)
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter uma proposta específica pelo seu ID, incluindo todas as relações
  getPropostaById: async (req, res) => {
    try {
      // O id da proposta vem dos parâmetros da URL
      const proposta = await models.propostas.findByPk(req.params.id, {
        include: [
          // Incluímos as mesmas relações que em getAllPropostas
          {
            model: models.empresas,
            as: "id_empresa_empresa",
          },
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

      // Se a proposta foi encontrada, devolve-a
      if (proposta) {
        res.json(proposta);
      } else {
        // Se não foi encontrada, devolve um erro 404 (não encontrado)
        res.status(404).json({ message: "Proposal not found" });
      }
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },

  // Método para criar uma nova proposta
  createProposta: async (req, res) => {
    try {
      // Extrai os campos do body do pedido
      const {
        ID_DEPARTAMENTO,
        ID_TIPO_PROPOSTA,
        ID_EMPRESA,
        DESCRICAO_PROPOSTA,
        NOME_PROPOSTA,
        competencias, // Array
      } = req.body;

      // Valida se todos os campos obrigatórios estão presentes
      if (
        !ID_DEPARTAMENTO ||
        !ID_TIPO_PROPOSTA ||
        !ID_EMPRESA ||
        !DESCRICAO_PROPOSTA ||
        !NOME_PROPOSTA
      ) {
        // Se algum campo obrigatório estiver em falta, devolve um erro 400 (bad request)
        return res.status(400).json({
          message: "Missing required fields. All fields are required.",
        });
      }

      // Verifica se o departamento existe na base de dados
      const departamento = await models.departamentos.findByPk(ID_DEPARTAMENTO);
      if (!departamento) {
        return res.status(404).json({ message: "Department not found" });
      }

      // Verifica se o tipo de proposta existe
      const tipoProposta = await models.tipo_proposta.findByPk(
        ID_TIPO_PROPOSTA
      );
      if (!tipoProposta) {
        return res.status(404).json({ message: "Proposal type not found" });
      }

      // Verifica se a empresa existe
      const empresa = await models.empresas.findByPk(ID_EMPRESA);
      if (!empresa) {
        return res.status(404).json({ message: "Company not found" });
      }

      // Cria a nova proposta na base de dados
      const newProposta = await models.propostas.create({
        id_departamento: ID_DEPARTAMENTO,
        id_tipo_proposta: ID_TIPO_PROPOSTA,
        id_empresa: ID_EMPRESA,
        descricao_proposta: DESCRICAO_PROPOSTA,
        nome_proposta: NOME_PROPOSTA,
      });

      // Adiciona as competências se forem fornecidas
      if (competencias && competencias.length > 0) {
        // Primeiro verifica se todas as competências existem na base de dados
        // Extrai apenas os IDs das competências do array
        const competenciaIds = competencias.map((comp) => comp.ID_COMPETENCIA);

        // Procura na base de dados por todas as competências com esses IDs
        const existingCompetencias = await models.competencias.findAll({
          where: {
            id_competencia: competenciaIds,
          },
        });

        // Se o número de competências encontradas for diferente do número de IDs fornecidos,
        // significa que algumas competências não existem na base de dados
        if (existingCompetencias.length !== competenciaIds.length) {
          // Faz um rollback eliminando a proposta criada
          await newProposta.destroy();
          return res.status(400).json({
            message: "One or more competencias do not exist in the database",
          });
        }

        // Se todas as competências existem, cria as associações na tabela proposta_competencias
        const competenciasPromises = competencias.map(async (comp) => {
          return await models.proposta_competencias.create({
            id_proposta: newProposta.id_proposta,
            id_competencia: comp.ID_COMPETENCIA,
          });
        });

        // Espera que todas as associações sejam criadas
        await Promise.all(competenciasPromises);

        // Processa notificações para candidatos que correspondem às competências da proposta
        // Isto é executado de forma assíncrona sem esperar pela conclusão
        notificacoesController.processNewProposal(newProposta.id_proposta);
      }

      // Busca a proposta criada com todas as suas associações para devolver na resposta
      const createdProposta = await models.propostas.findByPk(
        newProposta.id_proposta,
        {
          include: [
            {
              model: models.empresas,
              as: "id_empresa_empresa",
            },
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
        }
      );

      // Devolve a proposta criada com código 201 (created)
      res.status(201).json(createdProposta);
    } catch (error) {
      // Em caso de erro, devolve um código 400 (bad request)
      res.status(400).json({ message: error.message });
    }
  },

  // Método para atualizar uma proposta existente
  updateProposta: async (req, res) => {
    try {
      // Extrai os campos do body do pedido e o ID da proposta dos parâmetros da URL
      const {
        ID_DEPARTAMENTO,
        ID_TIPO_PROPOSTA,
        ID_EMPRESA,
        DESCRICAO_PROPOSTA,
        NOME_PROPOSTA,
        competencias,
      } = req.body;
      const propostaId = req.params.id;

      // Verifica se a proposta existe
      const proposta = await models.propostas.findByPk(propostaId);
      if (!proposta) {
        return res.status(404).json({ message: "Proposal not found" });
      }

      // Valida o departamento, se fornecido
      if (ID_DEPARTAMENTO) {
        const departamento = await models.departamentos.findByPk(
          ID_DEPARTAMENTO
        );
        if (!departamento) {
          return res.status(404).json({ message: "Department not found" });
        }
      }

      // Valida o tipo de proposta, se fornecido
      if (ID_TIPO_PROPOSTA) {
        const tipoProposta = await models.tipo_proposta.findByPk(
          ID_TIPO_PROPOSTA
        );
        if (!tipoProposta) {
          return res.status(404).json({ message: "Proposal type not found" });
        }
      }

      // Valida a empresa, se fornecida
      if (ID_EMPRESA) {
        const empresa = await models.empresas.findByPk(ID_EMPRESA);
        if (!empresa) {
          return res.status(404).json({ message: "Company not found" });
        }
      }

      // Cria um objeto com os campos a atualizar
      // Só inclui os campos que foram fornecidos no pedido
      const updateFields = {};
      if (ID_DEPARTAMENTO) updateFields.id_departamento = ID_DEPARTAMENTO;
      if (ID_TIPO_PROPOSTA) updateFields.id_tipo_proposta = ID_TIPO_PROPOSTA;
      if (ID_EMPRESA) updateFields.id_empresa = ID_EMPRESA;
      if (DESCRICAO_PROPOSTA)
        updateFields.descricao_proposta = DESCRICAO_PROPOSTA;
      if (NOME_PROPOSTA) updateFields.nome_proposta = NOME_PROPOSTA;

      // Atualiza a proposta com os novos campos
      await proposta.update(updateFields);

      // Atualiza as competências, se fornecidas
      if (competencias && competencias.length > 0) {
        // Verifica se todas as competências existem
        const competenciaIds = competencias.map((comp) => comp.ID_COMPETENCIA);
        const existingCompetencias = await models.competencias.findAll({
          where: {
            id_competencia: competenciaIds,
          },
        });

        if (existingCompetencias.length !== competenciaIds.length) {
          return res.status(400).json({
            message: "One or more competencias do not exist in the database",
          });
        }

        // Remove todas as associações existentes para esta proposta
        // Isto permite-nos recriar todas as associações com as novas competências
        await models.proposta_competencias.destroy({
          where: { id_proposta: propostaId },
        });

        // Cria novas associações para cada competência
        const competenciasPromises = competencias.map(async (comp) => {
          return await models.proposta_competencias.create({
            id_proposta: propostaId,
            id_competencia: comp.ID_COMPETENCIA,
          });
        });

        // Espera que todas as associações sejam criadas
        await Promise.all(competenciasPromises);
      }

      // Busca a proposta atualizada com todas as suas associações para devolver na resposta
      const updatedProposta = await models.propostas.findByPk(propostaId, {
        include: [
          {
            model: models.empresas,
            as: "id_empresa_empresa",
          },
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

      // Devolve a proposta atualizada
      res.json(updatedProposta);
    } catch (error) {
      // Em caso de erro, devolve um código 400
      res.status(400).json({ message: error.message });
    }
  },

  // Método para eliminar uma proposta
  deleteProposta: async (req, res) => {
    try {
      const propostaId = req.params.id;

      // Verifica se a proposta existe
      const proposta = await models.propostas.findByPk(propostaId);
      if (!proposta) {
        return res.status(404).json({ message: "Proposal not found" });
      }

      // Primeiro apaga todas as competências associadas a esta proposta
      // Isto é necessário devido às restrições de chave estrangeira
      await models.proposta_competencias.destroy({
        where: { id_proposta: propostaId },
      });

      // Apaga todas as notificações associadas a esta proposta
      await models.notificacoes_personalizadas.destroy({
        where: { id_proposta: propostaId },
      });

      // Por fim, apaga a própria proposta
      await proposta.destroy();

      // Devolve uma mensagem de sucesso
      res.json({ message: "Proposal deleted successfully" });
    } catch (error) {
      // Em caso de erro, devolve um código 500
      res.status(500).json({ message: error.message });
    }
  },

  // Método para adicionar uma competência a uma proposta existente
  addCompetencia: async (req, res) => {
    try {
      const propostaId = req.params.id;
      const { ID_COMPETENCIA } = req.body;

      // Verifica se a proposta existe
      const proposta = await models.propostas.findByPk(propostaId);
      if (!proposta) {
        return res.status(404).json({ message: "Proposal not found" });
      }

      // Verifica se a competência existe
      const competencia = await models.competencias.findByPk(ID_COMPETENCIA);
      if (!competencia) {
        return res.status(404).json({ message: "Competencia not found" });
      }

      // Verifica se a associação já existe
      const existingAssoc = await models.proposta_competencias.findOne({
        where: {
          id_proposta: propostaId,
          id_competencia: ID_COMPETENCIA,
        },
      });

      if (existingAssoc) {
        // Se a associação já existe, retorna um erro 400
        return res
          .status(400)
          .json({ message: "Proposal already has this competencia" });
      }

      // Cria a associação entre a proposta e a competência
      await models.proposta_competencias.create({
        id_proposta: propostaId,
        id_competencia: ID_COMPETENCIA,
      });

      // Busca a proposta atualizada para devolver
      const updatedProposta = await models.propostas.findByPk(propostaId, {
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencias_proposta_competencia",
          },
        ],
      });

      res.json(updatedProposta);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Método para remover uma competência de uma proposta
  removeCompetencia: async (req, res) => {
    try {
      const propostaId = req.params.id;
      const competenciaId = req.params.competenciaId;

      // Verifica se a associação entre proposta e competência existe
      const association = await models.proposta_competencias.findOne({
        where: {
          id_proposta: propostaId,
          id_competencia: competenciaId,
        },
      });

      if (!association) {
        // Se a associação não existe, retorna um erro 404
        return res
          .status(404)
          .json({ message: "Proposal does not have this competencia" });
      }

      // Remove a associação
      await association.destroy();

      // Busca a proposta atualizada para devolver
      const updatedProposta = await models.propostas.findByPk(propostaId, {
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencias_proposta_competencia",
          },
        ],
      });

      res.json(updatedProposta);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter todas as propostas que têm uma determinada competência
  // Útil para filtrar propostas por competência
  getPropostasByCompetencia: async (req, res) => {
    try {
      const competenciaId = req.params.competenciaId;

      // Verifica se a competência existe
      const competencia = await models.competencias.findByPk(competenciaId);
      if (!competencia) {
        return res.status(404).json({ message: "Competencia not found" });
      }

      // Encontra todas as propostas que têm esta competência
      // Usamos o 'include' com um 'where' na relação para filtrar as propostas
      const propostas = await models.propostas.findAll({
        include: [
          {
            model: models.competencias,
            as: "id_competencia_competencias_proposta_competencia",
            where: { id_competencia: competenciaId }, // Filtra pela competência específica
          },
          // Inclui as outras relações para ter informação completa
          {
            model: models.empresas,
            as: "id_empresa_empresa",
          },
          {
            model: models.departamentos,
            as: "id_departamento_departamento",
          },
          {
            model: models.tipo_proposta,
            as: "id_tipo_proposta_tipo_propostum",
          },
        ],
      });

      res.json(propostas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

// Exporta o controlador para ser usado por outras partes da aplicação
module.exports = propostasController;

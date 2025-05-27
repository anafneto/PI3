const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const Propostas = models.Propostas;

sequelize.sync();

const controller = {};
controller.propostas_list = async (req, res) => {
    try {
        const propostas = await Propostas.findAll();
        res.json(propostas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostas_detail = async (req, res) => {
    try {
        const proposta = await Propostas.findByPk(req.params.id);
        if (!proposta) return res.status(404).json({ message: 'Proposta não encontrada' });
        res.json(proposta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostas_create = async (req, res) => {
    try {
        const { titulo, descricao, data, id_utilizador, id_tipo } = req.body;
        if (!titulo || !descricao || !id_utilizador || !id_tipo) {
            return res.status(400).json({ error: 'Título, descrição, ID do utilizador e ID do tipo são obrigatórios' });
        }

        const proposta = await Propostas.create({
            titulo,
            descricao,
            data: data || new Date(),
            id_utilizador,
            id_tipo
        });

        res.status(201).json(proposta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostas_update = async (req, res) => {
    try {
        const proposta = await Propostas.findByPk(req.params.id);
        if (!proposta) return res.status(404).json({ message: 'Proposta não encontrada' });

        const { titulo, descricao, data, id_utilizador, id_tipo } = req.body;

        proposta.titulo = titulo ?? proposta.titulo;
        proposta.descricao = descricao ?? proposta.descricao;
        proposta.data = data ?? proposta.data;
        proposta.id_utilizador = id_utilizador ?? proposta.id_utilizador;
        proposta.id_tipo = id_tipo ?? proposta.id_tipo;

        await proposta.save();
        res.json(proposta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostas_delete = async (req, res) => {
    try {
        const proposta = await Propostas.findByPk(req.params.id);
        if (!proposta) return res.status(404).json({ message: 'Proposta não encontrada' });

        await proposta.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = controller;

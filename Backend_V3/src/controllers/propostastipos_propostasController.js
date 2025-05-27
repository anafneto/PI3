const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const Propostastipos_propostas = models.propostastipos_propostas;

sequelize.sync();

const controller = {};

controller.propostastipos_propostas_list = async (req, res) => {
    try {
        const propostastiposPropostas = await Propostastipos_propostas.findAll();
        res.json(propostastiposPropostas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostastipos_propostas_detail = async (req, res) => {
    try {
        const propostastiposProposta = await Propostastipos_propostas.findByPk(req.params.id);
        if (!propostastiposProposta) return res.status(404).json({ message: 'Tipo de proposta não encontrado' });
        res.json(propostastiposProposta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostastipos_propostas_create = async (req, res) => {
    try {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ error: 'Nome é obrigatório' });
        }

        const propostastiposProposta = await Propostastipos_propostas.create({ nome });
        res.status(201).json(propostastiposProposta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostastipos_propostas_update = async (req, res) => {
    try {
        const propostastiposProposta = await Propostastipos_propostas.findByPk(req.params.id);
        if (!propostastiposProposta) return res.status(404).json({ message: 'Tipo de proposta não encontrado' });

        const { nome } = req.body;
        propostastiposProposta.nome = nome ?? propostastiposProposta.nome;

        await propostastiposProposta.save();
        res.json(propostastiposProposta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostastipos_propostas_delete = async (req, res) => {
    try {
        const propostastiposProposta = await Propostastipos_propostas.findByPk(req.params.id);
        if (!propostastiposProposta) return res.status(404).json({ message: 'Tipo de proposta não encontrado' });

        await propostastiposProposta.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = controller;
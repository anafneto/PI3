const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const Propostastipos = models.propostastipos;

sequelize.sync();

const controller = {};
controller.propostas_tipos_list = async (req, res) => {
    try {
        const propostastipos = await Propostastipos.findAll();
        res.json(propostastipos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostas_tipos_detail = async (req, res) => {
    try {
        const propostastipo = await Propostastipos.findByPk(req.params.id);
        if (!propostastipo) return res.status(404).json({ message: 'Tipo de proposta não encontrado' });
        res.json(propostastipo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostas_tipos_create = async (req, res) => {
    try {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ error: 'Nome é obrigatório' });
        }

        const propostastipo = await Propostastipos.create({ nome });
        res.status(201).json(propostastipo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostas_tipos_update = async (req, res) => {
    try {
        const propostastipo = await Propostastipos.findByPk(req.params.id);
        if (!propostastipo) return res.status(404).json({ message: 'Tipo de proposta não encontrado' });

        const { nome } = req.body;
        propostastipo.nome = nome ?? propostastipo.nome;

        await propostastipo.save();
        res.json(propostastipo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostas_tipos_delete = async (req, res) => {
    try {
        const propostastipo = await Propostastipos.findByPk(req.params.id);
        if (!propostastipo) return res.status(404).json({ message: 'Tipo de proposta não encontrado' });

        await propostastipo.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = controller;
const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const Competencias = models.competencias;

sequelize.sync();
const controller = {};
controller.competencias_list = async (req, res) => {
    try {
        const competencias = await Competencias.findAll();
        res.json(competencias);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.competencias_detail = async (req, res) => {
    try {
        const competencia = await Competencias.findByPk(req.params.id);
        if (!competencia) return res.status(404).json({ message: 'Competência não encontrada' });
        res.json(competencia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.competencias_create = async (req, res) => {
    try {
        const { nome, descricao } = req.body;
        if (!nome || !descricao) {
            return res.status(400).json({ error: 'Nome e descrição são obrigatórios' });
        }

        const competencia = await Competencias.create({ nome, descricao });
        res.status(201).json(competencia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.competencias_update = async (req, res) => {
    try {
        const competencia = await Competencias.findByPk(req.params.id);
        if (!competencia) return res.status(404).json({ message: 'Competência não encontrada' });

        const { nome, descricao } = req.body;
        competencia.nome = nome ?? competencia.nome;
        competencia.descricao = descricao ?? competencia.descricao;

        await competencia.save();
        res.json(competencia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.competencias_delete = async (req, res) => {
    try {
        const competencia = await Competencias.findByPk(req.params.id);
        if (!competencia) return res.status(404).json({ message: 'Competência não encontrada' });

        await competencia.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = controller;
const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const Departamentos = models.departamentos;

sequelize.sync();

const controller = {};

controller.departamentos_list = async (req, res) => {
    try {
        const departamentos = await Departamentos.findAll();
        res.json(departamentos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.departamentos_detail = async (req, res) => {
    try {
        const departamento = await Departamentos.findByPk(req.params.id);
        if (!departamento) return res.status(404).json({ message: 'Departamento não encontrado' });
        res.json(departamento);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.departamentos_create = async (req, res) => {
    try {
        const { nome, localizacao } = req.body;
        if (!nome || !localizacao) {
            return res.status(400).json({ error: 'Nome e localização são obrigatórios' });
        }

        const departamento = await Departamentos.create({ nome, localizacao });
        res.status(201).json(departamento);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.departamentos_update = async (req, res) => {
    try {
        const departamento = await Departamentos.findByPk(req.params.id);
        if (!departamento) return res.status(404).json({ message: 'Departamento não encontrado' });

        const { nome, localizacao } = req.body;
        departamento.nome = nome ?? departamento.nome;
        departamento.localizacao = localizacao ?? departamento.localizacao;

        await departamento.save();
        res.json(departamento);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.departamentos_delete = async (req, res) => {
    try {
        const departamento = await Departamentos.findByPk(req.params.id);
        if (!departamento) return res.status(404).json({ message: 'Departamento não encontrado' });

        await departamento.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = controller;
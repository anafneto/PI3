const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const Empresas = models.empresas;

sequelize.sync();
const controller = {};
controller.empresas_list = async (req, res) => {
    try {
        const empresas = await Empresas.findAll();
        res.json(empresas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.empresas_detail = async (req, res) => {
    try {
        const empresa = await Empresas.findByPk(req.params.id);
        if (!empresa) return res.status(404).json({ message: 'Empresa não encontrada' });
        res.json(empresa);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.empresas_create = async (req, res) => {
    try {
        const { nome, email, telefone, morada } = req.body;
        if (!nome || !email || !telefone || !morada) {
            return res.status(400).json({ error: 'Nome, email, telefone e morada são obrigatórios' });
        }

        const empresa = await Empresas.create({ nome, email, telefone, morada });
        res.status(201).json(empresa);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.empresas_update = async (req, res) => {
    try {
        const empresa = await Empresas.findByPk(req.params.id);
        if (!empresa) return res.status(404).json({ message: 'Empresa não encontrada' });

        const { nome, email, telefone, morada } = req.body;
        empresa.nome = nome ?? empresa.nome;
        empresa.email = email ?? empresa.email;
        empresa.telefone = telefone ?? empresa.telefone;
        empresa.morada = morada ?? empresa.morada;

        await empresa.save();
        res.json(empresa);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.empresas_delete = async (req, res) => {
    try {
        const empresa = await Empresas.findByPk(req.params.id);
        if (!empresa) return res.status(404).json({ message: 'Empresa não encontrada' });

        await empresa.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = controller;
const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const Utilizadores_Tipos = models.utilizadores_tipos;

sequelize.sync();

const controller = {};

// LISTAR TODOS
controller.utilizadores_tipos_list = async (req, res) => {
    try {
        const utilizadoresTipos = await Utilizadores_Tipos.findAll();
        res.json(utilizadoresTipos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DETALHE POR ID
controller.utilizadores_tipos_detail = async (req, res) => {
    try {
        const utilizadoresTipo = await Utilizadores_Tipos.findByPk(req.params.id);
        if (!utilizadoresTipo) {
            return res.status(404).json({ message: 'Tipo de utilizador não encontrado' });
        }
        res.json(utilizadoresTipo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CRIAR NOVO
controller.utilizadores_tipos_create = async (req, res) => {
    try {
        const { designacao } = req.body;
        if (!designacao) {
            return res.status(400).json({ error: 'Designação é obrigatória' });
        }

        const utilizadoresTipo = await Utilizadores_Tipos.create({ designacao });
        res.status(201).json(utilizadoresTipo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ATUALIZAR
controller.utilizadores_tipos_update = async (req, res) => {
    try {
        const utilizadoresTipo = await Utilizadores_Tipos.findByPk(req.params.id);
        if (!utilizadoresTipo) {
            return res.status(404).json({ message: 'Tipo de utilizador não encontrado' });
        }

        const { designacao } = req.body;
        utilizadoresTipo.designacao = designacao ?? utilizadoresTipo.designacao;

        await utilizadoresTipo.save();
        res.json(utilizadoresTipo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// REMOVER
controller.utilizadores_tipos_delete = async (req, res) => {
    try {
        const utilizadoresTipo = await Utilizadores_Tipos.findByPk(req.params.id);
        if (!utilizadoresTipo) {
            return res.status(404).json({ message: 'Tipo de utilizador não encontrado' });
        }

        await utilizadoresTipo.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = controller;

const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const Notificacoes = models.notificacoes;

sequelize.sync();

const controller = {};
controller.notificacoes_list = async (req, res) => {
    try {
        const notificacoes = await Notificacoes.findAll();
        res.json(notificacoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.notificacoes_detail = async (req, res) => {
    try {
        const notificacao = await Notificacoes.findByPk(req.params.id);
        if (!notificacao) return res.status(404).json({ message: 'Notificação não encontrada' });
        res.json(notificacao);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.notificacoes_create = async (req, res) => {
    try {
        const { titulo, descricao, data, id_utilizador } = req.body;
        if (!titulo || !descricao || !id_utilizador) {
            return res.status(400).json({ error: 'Título, descrição e ID do utilizador são obrigatórios' });
        }

        const notificacao = await Notificacoes.create({
            titulo,
            descricao,
            data: data || new Date(),
            id_utilizador
        });

        res.status(201).json(notificacao);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.notificacoes_update = async (req, res) => {
    try {
        const notificacao = await Notificacoes.findByPk(req.params.id);
        if (!notificacao) return res.status(404).json({ message: 'Notificação não encontrada' });

        const { titulo, descricao, data, id_utilizador } = req.body;

        notificacao.titulo = titulo ?? notificacao.titulo;
        notificacao.descricao = descricao ?? notificacao.descricao;
        notificacao.data = data ?? notificacao.data;
        notificacao.id_utilizador = id_utilizador ?? notificacao.id_utilizador;

        await notificacao.save();
        res.json(notificacao);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.notificacoes_delete = async (req, res) => {
    try {
        const notificacao = await Notificacoes.findByPk(req.params.id);
        if (!notificacao) return res.status(404).json({ message: 'Notificação não encontrada' });

        await notificacao.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = controller;
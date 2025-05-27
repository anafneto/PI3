const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const Estudantes_notificacoes = models.estudantes_notificacoess;

sequelize.sync();

const controller = {};
controller.estudantes_notificacoes_list = async (req, res) => {
    try {
        const estudantes_notificacoes = await Estudantes_notificacoes.findAll();
        res.json(estudantes_notificacoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.estudantes_notificacoes_detail = async (req, res) => {
    try {
        const estudantes_notificacao = await Estudantes_notificacoes.findByPk(req.params.id);
        if (!estudantes_notificacao) return res.status(404).json({ message: 'Notificação de estudante não encontrada' });
        res.json(estudantes_notificacao);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.estudantes_notificacoes_create = async (req, res) => {
    try {
        const { id_estudante, id_notificacao } = req.body;
        if (!id_estudante || !id_notificacao) {
            return res.status(400).json({ error: 'ID do estudante e ID da notificação são obrigatórios' });
        }

        const estudantes_notificacao = await Estudantes_notificacoes.create({
            id_estudante,
            id_notificacao
        });

        res.status(201).json(estudantes_notificacao);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.estudantes_notificacoes_update = async (req, res) => {
    try {
        const estudantes_notificacao = await Estudantes_notificacoes.findByPk(req.params.id);
        if (!estudantes_notificacao) return res.status(404).json({ message: 'Notificação de estudante não encontrada' });

        const { id_estudante, id_notificacao } = req.body;

        estudantes_notificacao.id_estudante = id_estudante ?? estudantes_notificacao.id_estudante;
        estudantes_notificacao.id_notificacao = id_notificacao ?? estudantes_notificacao.id_notificacao;

        await estudantes_notificacao.save();
        res.json(estudantes_notificacao);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.estudantes_notificacoes_delete = async (req, res) => {
    try {
        const estudantes_notificacao = await Estudantes_notificacoes.findByPk(req.params.id);
        if (!estudantes_notificacao) return res.status(404).json({ message: 'Notificação de estudante não encontrada' });

        await estudantes_notificacao.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = controller;

const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const Propostas_competencias = models.propostas_competencias;

sequelize.sync();

const controller = {};

controller.propostas_competencias_list = async (req, res) => {
    try {
        const propostasCompetencias = await Propostas_competencias.findAll();
        res.json(propostasCompetencias);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostas_competencias_detail = async (req, res) => {
    try {
        const propostaCompetencia = await Propostas_competencias.findByPk(req.params.id);
        if (!propostaCompetencia) return res.status(404).json({ message: 'Competência de proposta não encontrada' });
        res.json(propostaCompetencia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostas_competencias_create = async (req, res) => {
    try {
        const { id_proposta, id_competencia } = req.body;
        if (!id_proposta || !id_competencia) {
            return res.status(400).json({ error: 'ID da proposta e ID da competência são obrigatórios' });
        }

        const propostaCompetencia = await Propostas_competencias.create({
            id_proposta,
            id_competencia
        });

        res.status(201).json(propostaCompetencia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostas_competencias_update = async (req, res) => {
    try {
        const propostaCompetencia = await Propostas_competencias.findByPk(req.params.id);
        if (!propostaCompetencia) return res.status(404).json({ message: 'Competência de proposta não encontrada' });

        const { id_proposta, id_competencia } = req.body;

        propostaCompetencia.id_proposta = id_proposta ?? propostaCompetencia.id_proposta;
        propostaCompetencia.id_competencia = id_competencia ?? propostaCompetencia.id_competencia;

        await propostaCompetencia.save();
        res.json(propostaCompetencia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.propostas_competencias_delete = async (req, res) => {
    try {
        const propostaCompetencia = await Propostas_competencias.findByPk(req.params.id);
        if (!propostaCompetencia) return res.status(404).json({ message: 'Competência de proposta não encontrada' });

        await propostaCompetencia.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = controller;


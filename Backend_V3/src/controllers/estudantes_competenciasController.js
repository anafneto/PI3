const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const Estudantes_competencias = models.estudantes_competencias;

sequelize.sync();
const controller = {};
controller.estudantes_competencias_list = async (req, res) => {
    try {
        const estudantesCompetencias = await Estudantes_competencias.findAll();
        res.json(estudantesCompetencias);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.estudantes_competencias_detail = async (req, res) => {
    try {
        const estudanteCompetencia = await Estudantes_competencias.findByPk(req.params.id);
        if (!estudanteCompetencia) return res.status(404).json({ message: 'Competência de estudante não encontrada' });
        res.json(estudanteCompetencia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.estudantes_competencias_create = async (req, res) => {
    try {
        const { id_estudante, id_competencia } = req.body;
        if (!id_estudante || !id_competencia) {
            return res.status(400).json({ error: 'ID do estudante e ID da competência são obrigatórios' });
        }

        const estudanteCompetencia = await Estudantes_competencias.create({
            id_estudante,
            id_competencia
        });

        res.status(201).json(estudanteCompetencia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.estudantes_competencias_update = async (req, res) => {
    try {
        const estudanteCompetencia = await Estudantes_competencias.findByPk(req.params.id);
        if (!estudanteCompetencia) return res.status(404).json({ message: 'Competência de estudante não encontrada' });

        const { id_estudante, id_competencia } = req.body;

        estudanteCompetencia.id_estudante = id_estudante ?? estudanteCompetencia.id_estudante;
        estudanteCompetencia.id_competencia = id_competencia ?? estudanteCompetencia.id_competencia;

        await estudanteCompetencia.save();
        res.json(estudanteCompetencia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.estudantes_competencias_delete = async (req, res) => {
    try {
        const estudanteCompetencia = await Estudantes_competencias.findByPk(req.params.id);
        if (!estudanteCompetencia) return res.status(404).json({ message: 'Competência de estudante não encontrada' });

        await estudanteCompetencia.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = controller;
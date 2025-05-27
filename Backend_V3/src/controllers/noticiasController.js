const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const Noticias = models.noticias;

sequelize.sync();

const controller = {};

controller.noticias_list = async (req, res) => {
    try {
        const noticias = await Noticias.findAll();
        res.json(noticias);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.noticias_detail = async (req, res) => {
    try {
        const noticia = await Noticias.findByPk(req.params.id);
        if (!noticia) return res.status(404).json({ message: 'Notícia não encontrada' });
        res.json(noticia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.noticias_create = async (req, res) => {
    try {
        const { titulo, descricao, data, imagem } = req.body;
        if (!titulo || !descricao) {
            return res.status(400).json({ error: 'Título e descrição são obrigatórios' });
        }

        const noticia = await Noticias.create({
            titulo,
            descricao,
            data: data || new Date(),
            imagem
        });

        res.status(201).json(noticia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.noticias_update = async (req, res) => {
    try {
        const noticia = await Noticias.findByPk(req.params.id);
        if (!noticia) return res.status(404).json({ message: 'Notícia não encontrada' });

        const { titulo, descricao, data, imagem } = req.body;

        noticia.titulo = titulo ?? noticia.titulo;
        noticia.descricao = descricao ?? noticia.descricao;
        noticia.data = data ?? noticia.data;
        noticia.imagem = imagem ?? noticia.imagem;

        await noticia.save();

        res.json(noticia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.noticias_delete = async (req, res) => {
    try {
        const noticia = await Noticias.findByPk(req.params.id);
        if (!noticia) return res.status(404).json({ message: 'Notícia não encontrada' });
        await noticia.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = controller;

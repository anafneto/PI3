const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = initModels(sequelize);
const Utilizador = models.utilizadores;

sequelize.sync();

const controller = {};

const JWT_SECRET = 'PI3_SECRET_KEY';

controller.utilizadores_list = async (req, res) => {
    try {
        const utilizadores = await Utilizador.findAll();
        res.json(utilizadores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.utilizadores_detail = async (req, res) => {
    try {
        const utilizador = await Utilizador.findByPk(req.params.id);
        if (!utilizador) return res.status(404).json({ message: 'Utilizador não encontrado' });
        res.json(utilizador);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.utilizadores_create = async (req, res) => {
    try {
        const { nome, email, password, id_utilizadortipo } = req.body;
        if (!nome || !email || !password || !id_utilizadortipo) {
            return res.status(400).json({ error: 'Nome, email, password e tipo de utilizador são obrigatórios' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const utilizador = await Utilizador.create({ 
            nome, 
            email, 
            password: hashedPassword, 
            id_utilizadortipo 
        });

        const user = utilizador.toJSON();
        delete user.password;

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.utilizadores_update = async (req, res) => {
    try {
        const utilizador = await Utilizador.findByPk(req.params.id);
        if (!utilizador) return res.status(404).json({ message: 'Utilizador não encontrado' });

        const { nome, email, password, id_utilizadortipo } = req.body;

        utilizador.nome = nome ?? utilizador.nome;
        utilizador.email = email ?? utilizador.email;
        utilizador.id_utilizadortipo = id_utilizadortipo ?? utilizador.id_utilizadortipo;

        if (password) {
            utilizador.password = await bcrypt.hash(password, 10);
        }

        await utilizador.save();

        const user = utilizador.toJSON();
        delete user.password;
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.utilizadores_delete = async (req, res) => {
    try {
        const utilizador = await Utilizador.findByPk(req.params.id);
        if (!utilizador) return res.status(404).json({ message: 'Utilizador não encontrado' });
        await utilizador.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

controller.utilizadores_login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const utilizador = await Utilizador.findOne({ where: { email } });

    if (!utilizador) return res.status(401).json({ message: 'Email ou password inválidos' });

    const isPasswordValid = await bcrypt.compare(password, utilizador.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Email ou password inválidos' });

    const token = jwt.sign(
      { 
        id_utilizador: utilizador.id_utilizador, 
        id_utilizadortipo: utilizador.id_utilizadortipo 
      }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ token, id_utilizadortipo: utilizador.id_utilizadortipo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = controller;

const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const Utilizador = models.utilizadores;
const Estudantes = models.estudantes;

sequelize.sync();
const controller = {};
controller.estudantes_list = async (req, res) => {
    try {
        const estudantes = await Estudantes.findAll();
        res.json(estudantes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
controller.estudantes_detail = async (req, res) => {
    try {
        const estudante = await Estudantes.findByPk(req.params.id);
        if (!estudante) return res.status(404).json({ message: 'Estudante não encontrado' });
        res.json(estudante);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const bcrypt = require('bcrypt');

controller.estudantes_create = async (req, res) => {
  try {
    const { nome, email, password, numero_mec, diplomado, id_utilizadortipo } = req.body;

    if (!nome || !email || !password || !id_utilizadortipo) {
      return res.status(400).json({ error: 'Nome, email, password e tipo de utilizador são obrigatórios' });
    }

    // 1. Criar o utilizador primeiro
    const hashedPassword = await bcrypt.hash(password, 10);
    const utilizador = await Utilizador.create({
      nome,
      email,
      password: hashedPassword,
      id_utilizadortipo
    });

    // 2. Criar o estudante associando o id_utilizador
    const estudante = await Estudantes.create({
      numero_mec,
      diplomado,
      id_utilizador: utilizador.id_utilizador
    });

    // 3. Remover password antes de devolver
    const userData = utilizador.toJSON();
    delete userData.password;

    res.status(201).json({
      utilizador: userData,
      estudante
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


controller.estudantes_update = async (req, res) => {
  try {
    const estudante = await Estudantes.findByPk(req.params.id);
    if (!estudante) return res.status(404).json({ message: 'Estudante não encontrado' });

    const utilizador = await Utilizador.findByPk(estudante.id_utilizador);
    if (!utilizador) return res.status(404).json({ message: 'Utilizador não encontrado' });

    const { nome, email, numero_mec, diplomado } = req.body;

    if (nome) utilizador.nome = nome;
    if (email) utilizador.email = email;
    await utilizador.save();

    if (numero_mec !== undefined) estudante.numero_mec = numero_mec;
    if (diplomado !== undefined) estudante.diplomado = diplomado;
    await estudante.save();

    const userData = utilizador.toJSON();
    delete userData.password;

    res.json({ utilizador: userData, estudante });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


controller.estudantes_delete = async (req, res) => {
    try {
        const estudante = await Estudantes.findByPk(req.params.id);
        if (!estudante) return res.status(404).json({ message: 'Estudante não encontrado' });

        await estudante.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = controller;
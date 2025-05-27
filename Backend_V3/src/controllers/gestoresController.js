const sequelize = require('../models/database');
const initModels = require('../models/init-models');
const bcrypt = require('bcrypt');

const models = initModels(sequelize);
const Utilizador = models.utilizadores;
const Gestores = models.gestores;

sequelize.sync();

const controller = {};

// Listar todos os gestores
controller.gestores_list = async (req, res) => {
  try {
    const gestores = await Gestores.findAll();
    res.json(gestores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Detalhes de um gestor
controller.gestores_detail = async (req, res) => {
  try {
    const gestor = await Gestores.findByPk(req.params.id_gestor);
    if (!gestor) return res.status(404).json({ message: 'Gestor não encontrado' });
    res.json(gestor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar gestor (cria primeiro utilizador com hash da password e depois gestor)
controller.gestores_create = async (req, res) => {
  try {
    const { nome, email, password, id_utilizadortipo, id_departamento } = req.body;

    if (!nome || !email || !password || !id_utilizadortipo) {
      return res.status(400).json({ error: 'Nome, email, password e tipo de utilizador são obrigatórios' });
    }

    // Criar utilizador com password encriptada
    const hashedPassword = await bcrypt.hash(password, 10);
    const utilizador = await Utilizador.create({
      nome,
      email,
      password: hashedPassword,
      id_utilizadortipo
    });

    // Criar gestor associado ao utilizador e departamento
    const gestor = await Gestores.create({
      id_utilizador: utilizador.id_utilizador,
      id_departamento: id_departamento || null
    });

    const userData = utilizador.toJSON();
    delete userData.password;

    res.status(201).json({ utilizador: userData, gestor });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar gestor e utilizador
controller.gestores_update = async (req, res) => {
  try {
    const gestor = await Gestores.findByPk(req.params.id_gestor);
    if (!gestor) return res.status(404).json({ message: 'Gestor não encontrado' });

    const utilizador = await Utilizador.findByPk(gestor.id_utilizador);
    if (!utilizador) return res.status(404).json({ message: 'Utilizador não encontrado' });

    const { nome, email, password, id_departamento } = req.body;

    if (nome) utilizador.nome = nome;
    if (email) utilizador.email = email;
    if (password) {
      utilizador.password = await bcrypt.hash(password, 10);
    }
    await utilizador.save();

    if (id_departamento !== undefined) gestor.id_departamento = id_departamento;

    await gestor.save();

    const userData = utilizador.toJSON();
    delete userData.password;

    res.json({ utilizador: userData, gestor });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Apagar gestor e utilizador associado
controller.gestores_delete = async (req, res) => {
  try {
    const gestor = await Gestores.findByPk(req.params.id_gestor);
    if (!gestor) return res.status(404).json({ message: 'Gestor não encontrado' });

    const utilizador = await Utilizador.findByPk(gestor.id_utilizador);
    if (utilizador) await utilizador.destroy();

    await gestor.destroy();
    res.status(204).send();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = controller;

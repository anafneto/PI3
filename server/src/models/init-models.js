var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _candidato_competencias = require("./candidato_competencias");
var _candidatos = require("./candidatos");
var _competencias = require("./competencias");
var _departamentos = require("./departamentos");
var _empresas = require("./empresas");
var _gestores = require("./gestores");
var _noticias = require("./noticias");
var _notificacoes_candidatos = require("./notificacoes_candidatos");
var _notificacoes_gerais = require("./notificacoes_gerais");
var _notificacoes_personalizadas = require("./notificacoes_personalizadas");
var _proposta_competencias = require("./proposta_competencias");
var _propostas = require("./propostas");
var _tipo_proposta = require("./tipo_proposta");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var candidato_competencias = _candidato_competencias(sequelize, DataTypes);
  var candidatos = _candidatos(sequelize, DataTypes);
  var competencias = _competencias(sequelize, DataTypes);
  var departamentos = _departamentos(sequelize, DataTypes);
  var empresas = _empresas(sequelize, DataTypes);
  var gestores = _gestores(sequelize, DataTypes);
  var noticias = _noticias(sequelize, DataTypes);
  var notificacoes_candidatos = _notificacoes_candidatos(sequelize, DataTypes);
  var notificacoes_gerais = _notificacoes_gerais(sequelize, DataTypes);
  var notificacoes_personalizadas = _notificacoes_personalizadas(sequelize, DataTypes);
  var proposta_competencias = _proposta_competencias(sequelize, DataTypes);
  var propostas = _propostas(sequelize, DataTypes);
  var tipo_proposta = _tipo_proposta(sequelize, DataTypes);

  candidatos.belongsToMany(competencias, { as: 'id_competencia_competencia', through: candidato_competencias, foreignKey: "nr_mecanografico", otherKey: "id_competencia" });
  candidatos.belongsToMany(notificacoes_personalizadas, { as: 'id_msg_personalizada_notificacoes_personalizadas', through: notificacoes_candidatos, foreignKey: "nr_mecanografico", otherKey: "id_msg_personalizada" });
  competencias.belongsToMany(candidatos, { as: 'nr_mecanografico_candidatos', through: candidato_competencias, foreignKey: "id_competencia", otherKey: "nr_mecanografico" });
  competencias.belongsToMany(propostas, { as: 'id_proposta_proposta', through: proposta_competencias, foreignKey: "id_competencia", otherKey: "id_proposta" });
  notificacoes_personalizadas.belongsToMany(candidatos, { as: 'nr_mecanografico_candidatos_notificacoes_candidatos', through: notificacoes_candidatos, foreignKey: "id_msg_personalizada", otherKey: "nr_mecanografico" });
  propostas.belongsToMany(competencias, { as: 'id_competencia_competencias_proposta_competencia', through: proposta_competencias, foreignKey: "id_proposta", otherKey: "id_competencia" });
  candidato_competencias.belongsTo(candidatos, { as: "nr_mecanografico_candidato", foreignKey: "nr_mecanografico"});
  candidatos.hasMany(candidato_competencias, { as: "candidato_competencia", foreignKey: "nr_mecanografico"});
  notificacoes_candidatos.belongsTo(candidatos, { as: "nr_mecanografico_candidato", foreignKey: "nr_mecanografico"});
  candidatos.hasMany(notificacoes_candidatos, { as: "notificacoes_candidatos", foreignKey: "nr_mecanografico"});
  candidato_competencias.belongsTo(competencias, { as: "id_competencia_competencia", foreignKey: "id_competencia"});
  competencias.hasMany(candidato_competencias, { as: "candidato_competencia", foreignKey: "id_competencia"});
  proposta_competencias.belongsTo(competencias, { as: "id_competencia_competencia", foreignKey: "id_competencia"});
  competencias.hasMany(proposta_competencias, { as: "proposta_competencia", foreignKey: "id_competencia"});
  gestores.belongsTo(departamentos, { as: "id_departamento_departamento", foreignKey: "id_departamento"});
  departamentos.hasMany(gestores, { as: "gestores", foreignKey: "id_departamento"});
  propostas.belongsTo(departamentos, { as: "id_departamento_departamento", foreignKey: "id_departamento"});
  departamentos.hasMany(propostas, { as: "proposta", foreignKey: "id_departamento"});
  propostas.belongsTo(empresas, { as: "id_empresa_empresa", foreignKey: "id_empresa"});
  empresas.hasMany(propostas, { as: "proposta", foreignKey: "id_empresa"});
  notificacoes_candidatos.belongsTo(notificacoes_personalizadas, { as: "id_msg_personalizada_notificacoes_personalizada", foreignKey: "id_msg_personalizada"});
  notificacoes_personalizadas.hasMany(notificacoes_candidatos, { as: "notificacoes_candidatos", foreignKey: "id_msg_personalizada"});
  notificacoes_personalizadas.belongsTo(propostas, { as: "id_proposta_proposta", foreignKey: "id_proposta"});
  propostas.hasMany(notificacoes_personalizadas, { as: "notificacoes_personalizadas", foreignKey: "id_proposta"});
  proposta_competencias.belongsTo(propostas, { as: "id_proposta_proposta", foreignKey: "id_proposta"});
  propostas.hasMany(proposta_competencias, { as: "proposta_competencia", foreignKey: "id_proposta"});
  propostas.belongsTo(tipo_proposta, { as: "id_tipo_proposta_tipo_propostum", foreignKey: "id_tipo_proposta"});
  tipo_proposta.hasMany(propostas, { as: "proposta", foreignKey: "id_tipo_proposta"});

  return {
    admin,
    candidato_competencias,
    candidatos,
    competencias,
    departamentos,
    empresas,
    gestores,
    noticias,
    notificacoes_candidatos,
    notificacoes_gerais,
    notificacoes_personalizadas,
    proposta_competencias,
    propostas,
    tipo_proposta,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

var DataTypes = require("sequelize").DataTypes;
var _competencias = require("./competencias");
var _departamentos = require("./departamentos");
var _empresas = require("./empresas");
var _estudantes = require("./estudantes");
var _estudantes_competencias = require("./estudantes_competencias");
var _estudantes_notificacoes = require("./estudantes_notificacoes");
var _gestores = require("./gestores");
var _noticias = require("./noticias");
var _notificacoes = require("./notificacoes");
var _propostas = require("./propostas");
var _propostas_competencias = require("./propostas_competencias");
var _propostas_tipos = require("./propostas_tipos");
var _propostatipos_propostas = require("./propostatipos_propostas");
var _utilizadores = require("./utilizadores");
var _utilizadores_tipos = require("./utilizadores_tipos");

function initModels(sequelize) {
  var competencias = _competencias(sequelize, DataTypes);
  var departamentos = _departamentos(sequelize, DataTypes);
  var empresas = _empresas(sequelize, DataTypes);
  var estudantes = _estudantes(sequelize, DataTypes);
  var estudantes_competencias = _estudantes_competencias(sequelize, DataTypes);
  var estudantes_notificacoes = _estudantes_notificacoes(sequelize, DataTypes);
  var gestores = _gestores(sequelize, DataTypes);
  var noticias = _noticias(sequelize, DataTypes);
  var notificacoes = _notificacoes(sequelize, DataTypes);
  var propostas = _propostas(sequelize, DataTypes);
  var propostas_competencias = _propostas_competencias(sequelize, DataTypes);
  var propostas_tipos = _propostas_tipos(sequelize, DataTypes);
  var propostatipos_propostas = _propostatipos_propostas(sequelize, DataTypes);
  var utilizadores = _utilizadores(sequelize, DataTypes);
  var utilizadores_tipos = _utilizadores_tipos(sequelize, DataTypes);

  estudantes_competencias.belongsTo(competencias, { as: "id_competencia_competencia", foreignKey: "id_competencia"});
  competencias.hasMany(estudantes_competencias, { as: "estudantes_competencia", foreignKey: "id_competencia"});
  propostas_competencias.belongsTo(competencias, { as: "id_competencia_competencia", foreignKey: "id_competencia"});
  competencias.hasMany(propostas_competencias, { as: "propostas_competencia", foreignKey: "id_competencia"});
  gestores.belongsTo(departamentos, { as: "id_departamento_departamento", foreignKey: "id_departamento"});
  departamentos.hasMany(gestores, { as: "gestores", foreignKey: "id_departamento"});
  propostas.belongsTo(empresas, { as: "id_empresa_empresa", foreignKey: "id_empresa"});
  empresas.hasMany(propostas, { as: "proposta", foreignKey: "id_empresa"});
  estudantes_competencias.belongsTo(estudantes, { as: "id_estudante_estudante", foreignKey: "id_estudante"});
  estudantes.hasMany(estudantes_competencias, { as: "estudantes_competencia", foreignKey: "id_estudante"});
  estudantes_notificacoes.belongsTo(estudantes, { as: "id_estudante_estudante", foreignKey: "id_estudante"});
  estudantes.hasMany(estudantes_notificacoes, { as: "estudantes_notificacos", foreignKey: "id_estudante"});
  estudantes_notificacoes.belongsTo(notificacoes, { as: "id_notificacao_notificaco", foreignKey: "id_notificacao"});
  notificacoes.hasMany(estudantes_notificacoes, { as: "estudantes_notificacos", foreignKey: "id_notificacao"});
  notificacoes.belongsTo(propostas, { as: "id_proposta_proposta", foreignKey: "id_proposta"});
  propostas.hasMany(notificacoes, { as: "notificacos", foreignKey: "id_proposta"});
  propostas_competencias.belongsTo(propostas, { as: "id_proposta_proposta", foreignKey: "id_proposta"});
  propostas.hasMany(propostas_competencias, { as: "propostas_competencia", foreignKey: "id_proposta"});
  propostatipos_propostas.belongsTo(propostas, { as: "id_proposta_proposta", foreignKey: "id_proposta"});
  propostas.hasMany(propostatipos_propostas, { as: "propostatipos_proposta", foreignKey: "id_proposta"});
  propostatipos_propostas.belongsTo(propostas_tipos, { as: "id_propostatipo_propostas_tipo", foreignKey: "id_propostatipo"});
  propostas_tipos.hasMany(propostatipos_propostas, { as: "propostatipos_proposta", foreignKey: "id_propostatipo"});
  empresas.belongsTo(utilizadores, { as: "id_utilizador_utilizadore", foreignKey: "id_utilizador"});
  utilizadores.hasMany(empresas, { as: "empresas", foreignKey: "id_utilizador"});
  estudantes.belongsTo(utilizadores, { as: "id_utilizador_utilizadore", foreignKey: "id_utilizador"});
  utilizadores.hasMany(estudantes, { as: "estudantes", foreignKey: "id_utilizador"});
  gestores.belongsTo(utilizadores, { as: "id_utilizador_utilizadore", foreignKey: "id_utilizador"});
  utilizadores.hasMany(gestores, { as: "gestores", foreignKey: "id_utilizador"});
  utilizadores.belongsTo(utilizadores_tipos, { as: "id_utilizadortipo_utilizadores_tipo", foreignKey: "id_utilizadortipo"});
  utilizadores_tipos.hasMany(utilizadores, { as: "utilizadores", foreignKey: "id_utilizadortipo"});

  return {
    competencias,
    departamentos,
    empresas,
    estudantes,
    estudantes_competencias,
    estudantes_notificacoes,
    gestores,
    noticias,
    notificacoes,
    propostas,
    propostas_competencias,
    propostas_tipos,
    propostatipos_propostas,
    utilizadores,
    utilizadores_tipos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

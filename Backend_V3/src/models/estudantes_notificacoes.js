const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estudantes_notificacoes', {
    id_notificacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'notificacoes',
        key: 'id_notificacao'
      }
    },
    id_estudante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estudantes',
        key: 'id_estudante'
      }
    },
    id_notificacao_estudante: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'estudantes_notificacoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_estudantes_notificacoes",
        unique: true,
        fields: [
          { name: "id_notificacao_estudante" },
        ]
      },
      {
        name: "relationship_10_fk",
        fields: [
          { name: "id_notificacao" },
        ]
      },
      {
        name: "relationship_18_fk",
        fields: [
          { name: "id_estudante" },
        ]
      },
    ]
  });
};

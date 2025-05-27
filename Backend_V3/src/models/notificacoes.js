const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notificacoes', {
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_notificacao: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_proposta: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'propostas',
        key: 'id_proposta'
      }
    }
  }, {
    sequelize,
    tableName: 'notificacoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_notificacoes",
        unique: true,
        fields: [
          { name: "id_notificacao" },
        ]
      },
      {
        name: "relationship_11_fk",
        fields: [
          { name: "id_proposta" },
        ]
      },
    ]
  });
};

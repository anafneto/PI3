const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('propostas_competencias', {
    id_proposta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'propostas',
        key: 'id_proposta'
      }
    },
    id_competencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'competencias',
        key: 'id_competencia'
      }
    },
    id_proposta_competencia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'propostas_competencias',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_propostas_competencias",
        unique: true,
        fields: [
          { name: "id_proposta_competencia" },
        ]
      },
      {
        name: "relationship_17_fk",
        fields: [
          { name: "id_competencia" },
        ]
      },
      {
        name: "relationship_9_fk",
        fields: [
          { name: "id_proposta" },
        ]
      },
    ]
  });
};

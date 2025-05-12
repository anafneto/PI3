const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proposta_competencias', {
    id_proposta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'propostas',
        key: 'id_proposta'
      }
    },
    id_competencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'competencias',
        key: 'id_competencia'
      }
    }
  }, {
    sequelize,
    tableName: 'proposta_competencias',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "competencias_proposta_pk",
        unique: true,
        fields: [
          { name: "id_proposta" },
          { name: "id_competencia" },
        ]
      },
      {
        name: "pk_proposta_competencias",
        unique: true,
        fields: [
          { name: "id_proposta" },
          { name: "id_competencia" },
        ]
      },
      {
        name: "relationship_13_fk",
        fields: [
          { name: "id_proposta" },
        ]
      },
      {
        name: "relationship_7_fk",
        fields: [
          { name: "id_competencia" },
        ]
      },
    ]
  });
};

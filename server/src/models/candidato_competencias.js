const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('candidato_competencias', {
    id_competencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'competencias',
        key: 'id_competencia'
      }
    },
    nr_mecanografico: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'candidatos',
        key: 'nr_mecanografico'
      }
    }
  }, {
    sequelize,
    tableName: 'candidato_competencias',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "competencias_candidato_pk",
        unique: true,
        fields: [
          { name: "id_competencia" },
          { name: "nr_mecanografico" },
        ]
      },
      {
        name: "pk_candidato_competencias",
        unique: true,
        fields: [
          { name: "id_competencia" },
          { name: "nr_mecanografico" },
        ]
      },
      {
        name: "relationship_12_fk",
        fields: [
          { name: "nr_mecanografico" },
        ]
      },
      {
        name: "relationship_6_fk",
        fields: [
          { name: "id_competencia" },
        ]
      },
    ]
  });
};

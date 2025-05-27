const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estudantes_competencias', {
    id_estudante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estudantes',
        key: 'id_estudante'
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
    id_estudante_competencia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'estudantes_competencias',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_estudantes_competencias",
        unique: true,
        fields: [
          { name: "id_estudante_competencia" },
        ]
      },
      {
        name: "relationship_16_fk",
        fields: [
          { name: "id_competencia" },
        ]
      },
      {
        name: "relationship_8_fk",
        fields: [
          { name: "id_estudante" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('competencias', {
    id_competencia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome_competencia: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'competencias',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "competencias_pk",
        unique: true,
        fields: [
          { name: "id_competencia" },
        ]
      },
      {
        name: "pk_competencias",
        unique: true,
        fields: [
          { name: "id_competencia" },
        ]
      },
    ]
  });
};

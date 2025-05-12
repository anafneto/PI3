const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('candidatos', {
    diplomado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    nr_mecanografico: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    password_candidato: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'candidatos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "candidatos_pk",
        unique: true,
        fields: [
          { name: "nr_mecanografico" },
        ]
      },
      {
        name: "pk_candidatos",
        unique: true,
        fields: [
          { name: "nr_mecanografico" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departamentos', {
    nome_departamento: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id_departamento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'departamentos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "departamentos_pk",
        unique: true,
        fields: [
          { name: "id_departamento" },
        ]
      },
      {
        name: "pk_departamentos",
        unique: true,
        fields: [
          { name: "id_departamento" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departamentos', {
    designacao: {
      type: DataTypes.STRING(100),
      allowNull: true
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
        name: "pk_departamentos",
        unique: true,
        fields: [
          { name: "id_departamento" },
        ]
      },
    ]
  });
};

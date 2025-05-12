const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('empresas', {
    nif_empresa: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_empresa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    password_empresa: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email_empresa: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'empresas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "empresas_pk",
        unique: true,
        fields: [
          { name: "id_empresa" },
        ]
      },
      {
        name: "pk_empresas",
        unique: true,
        fields: [
          { name: "id_empresa" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('empresas', {
    nome_empresa: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    nif: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    id_empresa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'utilizadores',
        key: 'id_utilizador'
      }
    }
  }, {
    sequelize,
    tableName: 'empresas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_empresas",
        unique: true,
        fields: [
          { name: "id_empresa" },
        ]
      },
      {
        name: "relationship_13_fk",
        fields: [
          { name: "id_utilizador" },
        ]
      },
    ]
  });
};

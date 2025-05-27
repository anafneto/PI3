const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilizadores', {
    pendente: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_utilizador: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_utilizadortipo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'utilizadores_tipos',
        key: 'id_utilizadortipo'
      }
    }
  }, {
    sequelize,
    tableName: 'utilizadores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_utilizadores",
        unique: true,
        fields: [
          { name: "id_utilizador" },
        ]
      },
      {
        name: "relationship_1_fk",
        fields: [
          { name: "id_utilizadortipo" },
        ]
      },
    ]
  });
};

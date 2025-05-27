const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estudantes', {
    numero_mec: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    diplomado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    id_estudante: {
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
    tableName: 'estudantes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_estudantes",
        unique: true,
        fields: [
          { name: "id_estudante" },
        ]
      },
      {
        name: "relationship_12_fk",
        fields: [
          { name: "id_utilizador" },
        ]
      },
    ]
  });
};

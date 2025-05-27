const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gestores', {
    id_gestor: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_departamento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'departamentos',
        key: 'id_departamento'
      }
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
    tableName: 'gestores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_gestores",
        unique: true,
        fields: [
          { name: "id_gestor" },
        ]
      },
      {
        name: "relationship_14_fk",
        fields: [
          { name: "id_utilizador" },
        ]
      },
      {
        name: "relationship_2_fk",
        fields: [
          { name: "id_departamento" },
        ]
      },
    ]
  });
};

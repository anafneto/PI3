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
      allowNull: false,
      references: {
        model: 'departamentos',
        key: 'id_departamento'
      }
    },
    username_gestor: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password_gestor: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'gestores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "gestores_pk",
        unique: true,
        fields: [
          { name: "id_gestor" },
        ]
      },
      {
        name: "pk_gestores",
        unique: true,
        fields: [
          { name: "id_gestor" },
        ]
      },
      {
        name: "relationship_8_fk",
        fields: [
          { name: "id_departamento" },
        ]
      },
    ]
  });
};

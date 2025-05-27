const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('propostas', {
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_proposta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'empresas',
        key: 'id_empresa'
      }
    }
  }, {
    sequelize,
    tableName: 'propostas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_propostas",
        unique: true,
        fields: [
          { name: "id_proposta" },
        ]
      },
      {
        name: "relationship_6_fk",
        fields: [
          { name: "id_empresa" },
        ]
      },
    ]
  });
};

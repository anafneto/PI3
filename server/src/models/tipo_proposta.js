const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_proposta', {
    nome_tipo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_tipo_proposta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'tipo_proposta',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipo_proposta",
        unique: true,
        fields: [
          { name: "id_tipo_proposta" },
        ]
      },
      {
        name: "tipo_proposta_pk",
        unique: true,
        fields: [
          { name: "id_tipo_proposta" },
        ]
      },
    ]
  });
};

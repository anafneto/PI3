const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('propostatipos_propostas', {
    id_propostatipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'propostas_tipos',
        key: 'id_propostatipo'
      }
    },
    id_proposta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'propostas',
        key: 'id_proposta'
      }
    },
    id_propostatipo_proposta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'propostatipos_propostas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_propostatipos_propostas",
        unique: true,
        fields: [
          { name: "id_propostatipo_proposta" },
        ]
      },
      {
        name: "relationship_15_fk",
        fields: [
          { name: "id_proposta" },
        ]
      },
      {
        name: "relationship_7_fk",
        fields: [
          { name: "id_propostatipo" },
        ]
      },
    ]
  });
};

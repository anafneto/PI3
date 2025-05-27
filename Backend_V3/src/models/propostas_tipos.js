const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('propostas_tipos', {
    designacao: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    id_propostatipo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'propostas_tipos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_propostas_tipos",
        unique: true,
        fields: [
          { name: "id_propostatipo" },
        ]
      },
    ]
  });
};

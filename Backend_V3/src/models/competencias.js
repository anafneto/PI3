const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('competencias', {
    designacao: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    id_competencia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'competencias',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_competencias",
        unique: true,
        fields: [
          { name: "id_competencia" },
        ]
      },
    ]
  });
};

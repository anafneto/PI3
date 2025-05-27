const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilizadores_tipos', {
    designacao: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    id_utilizadortipo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'utilizadores_tipos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_utilizadores_tipos",
        unique: true,
        fields: [
          { name: "id_utilizadortipo" },
        ]
      },
    ]
  });
};

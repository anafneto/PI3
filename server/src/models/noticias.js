const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('noticias', {
    id_noticia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo_noticia: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    corpo_noticia: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data_noticia: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'noticias',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "noticias_pk",
        unique: true,
        fields: [
          { name: "id_noticia" },
        ]
      },
      {
        name: "pk_noticias",
        unique: true,
        fields: [
          { name: "id_noticia" },
        ]
      },
    ]
  });
};

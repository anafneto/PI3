const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notificacoes_gerais', {
    mensagem: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data_hora: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    lido: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    id_msg_geral: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'notificacoes_gerais',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "notificacoes_gerais_pk",
        unique: true,
        fields: [
          { name: "id_msg_geral" },
        ]
      },
      {
        name: "pk_notificacoes_gerais",
        unique: true,
        fields: [
          { name: "id_msg_geral" },
        ]
      },
    ]
  });
};

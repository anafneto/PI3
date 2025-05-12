const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notificacoes_personalizadas', {
    id_proposta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'propostas',
        key: 'id_proposta'
      }
    },
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
    id_msg_personalizada: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'notificacoes_personalizadas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "notificacoes_personalizadas_pk",
        unique: true,
        fields: [
          { name: "id_msg_personalizada" },
        ]
      },
      {
        name: "pk_notificacoes_personalizadas",
        unique: true,
        fields: [
          { name: "id_msg_personalizada" },
        ]
      },
      {
        name: "relationship_11_fk",
        fields: [
          { name: "id_proposta" },
        ]
      },
    ]
  });
};

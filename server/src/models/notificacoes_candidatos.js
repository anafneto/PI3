const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notificacoes_candidatos', {
    id_msg_personalizada: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'notificacoes_personalizadas',
        key: 'id_msg_personalizada'
      }
    },
    nr_mecanografico: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'candidatos',
        key: 'nr_mecanografico'
      }
    }
  }, {
    sequelize,
    tableName: 'notificacoes_candidatos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_notificacoes_candidatos",
        unique: true,
        fields: [
          { name: "id_msg_personalizada" },
          { name: "nr_mecanografico" },
        ]
      },
      {
        name: "relationship_14_fk",
        fields: [
          { name: "nr_mecanografico" },
        ]
      },
      {
        name: "relationship_9_fk",
        fields: [
          { name: "id_msg_personalizada" },
        ]
      },
      {
        name: "relationship_9_pk",
        unique: true,
        fields: [
          { name: "id_msg_personalizada" },
          { name: "nr_mecanografico" },
        ]
      },
    ]
  });
};

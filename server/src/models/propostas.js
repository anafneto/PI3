const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('propostas', {
    id_departamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'departamentos',
        key: 'id_departamento'
      }
    },
    id_tipo_proposta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_proposta',
        key: 'id_tipo_proposta'
      }
    },
    id_proposta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empresas',
        key: 'id_empresa'
      }
    },
    descricao_proposta: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nome_proposta: {
      type: DataTypes.TEXT,
      allowNull: false
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
        name: "propostas_departamento_fk",
        fields: [
          { name: "id_departamento" },
        ]
      },
      {
        name: "propostas_pk",
        unique: true,
        fields: [
          { name: "id_proposta" },
        ]
      },
      {
        name: "relationship_10_fk",
        fields: [
          { name: "id_tipo_proposta" },
        ]
      },
      {
        name: "relationship_5_fk",
        fields: [
          { name: "id_empresa" },
        ]
      },
    ]
  });
};

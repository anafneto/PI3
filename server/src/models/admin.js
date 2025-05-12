const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    id_admin: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    password_admin: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    username_admin: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'admin',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "admin_pk",
        unique: true,
        fields: [
          { name: "id_admin" },
        ]
      },
      {
        name: "pk_admin",
        unique: true,
        fields: [
          { name: "id_admin" },
        ]
      },
    ]
  });
};

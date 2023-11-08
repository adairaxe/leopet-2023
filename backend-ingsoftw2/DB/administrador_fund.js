const db = require("../DB/index");
const { DataTypes } = require("sequelize");

const AdminFund = db.sequelize.define(
  'AdminFund',
  {
    fundacion_id: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'administrador_fundacion',
  },
);

module.exports = AdminFund;

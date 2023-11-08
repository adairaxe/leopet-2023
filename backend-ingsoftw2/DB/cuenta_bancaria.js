const db = require("../DB/index");
const { DataTypes } = require("sequelize");

const CuentaBancaria = db.sequelize.define(
  'CuentaBancaria',
  {
    banco: {
      type: DataTypes.STRING,
    },
    numero: {
      type: DataTypes.STRING,
    },
    tipo: {
      type: DataTypes.STRING,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    fundacion_id: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    principal: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'cuenta_bancaria',
  },
);

module.exports = CuentaBancaria;

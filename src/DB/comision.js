const { DataTypes } = require('sequelize');
const db = require('./index');

const Comision = db.sequelize.define(
  'Comision',
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
    visible: {
      type: DataTypes.BOOLEAN,
    },
    total_comision: {
      type: DataTypes.DOUBLE(11, 2),
    },
    total_pago: {
      type: DataTypes.DOUBLE(11, 2),
    },
  },
  {
    tableName: 'comision',
  },
);

module.exports = Comision;

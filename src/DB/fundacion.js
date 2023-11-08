const { DataTypes } = require('sequelize');
const db = require('./index');

const Fundacion = db.sequelize.define(
  'Fundacion',
  {
    ruc: {
      type: DataTypes.STRING,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    aprobado: {
      type: DataTypes.BOOLEAN,
    },
    comision: {
      type: DataTypes.DECIMAL,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    logo: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'fundacion',
  },
);

module.exports = Fundacion;

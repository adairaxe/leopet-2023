const { DataTypes } = require('sequelize');
const db = require('./index');
const Usuario = require('./usuario');

const Manada = db.sequelize.define(
  'Manada',
  {
    nombre: {
      type: DataTypes.STRING,
    },
    monto: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    statusSubscription: {
      type: DataTypes.BOOLEAN,
    },
    productId: {
      type: DataTypes.STRING,
    },
    responseProduct: {
      type: DataTypes.JSON,
    },
    planId: {
      type: DataTypes.STRING,
    },
    responsePlan: {
      type: DataTypes.JSON,
    },
    subscriptionId: {
      type: DataTypes.STRING,
    },
    responseSubscription: {
      type: DataTypes.JSON,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    galeriamanada: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: 'manada',
  },
);
Manada.associate = () => {
  Manada.belongsTo(Usuario, {
    foreignKey: 'userId',
  });
};

module.exports = Manada;

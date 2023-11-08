const { DataTypes } = require('sequelize');
const db = require('./index');
const ActualizacionAnimal = require('./actualizacion_animal');

const Rating = db.sequelize.define(
  'Rating',
  {
    valor: {
      type: DataTypes.DECIMAL,
    },
    actualizacion_id: {
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
    tableName: 'rating',
  },
);

Rating.associate = () => {
  Rating.belongsTo(ActualizacionAnimal, {
    foreignKey: 'actualizacion_id',
  });
};

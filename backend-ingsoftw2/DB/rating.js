const db = require("../DB/index");
const { DataTypes } = require("sequelize");
const ActualizacionAnimal = require("../DB/actualizacion_animal");

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


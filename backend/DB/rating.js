module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
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

  Rating.associate = (models) => {
    Rating.belongsTo(models.ActualizacionAnimal, {
      foreignKey: 'actualizacion_id',
    });
  };
  return Rating;
};

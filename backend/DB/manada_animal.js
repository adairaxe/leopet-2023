module.exports = (sequelize, DataTypes) => {
  const manadaAnimal = sequelize.define(
    'ManadaAnimal',
    {
      manada_id: {
        type: DataTypes.INTEGER,
      },
      animal_id: {
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
      tableName: 'manada_animal',
    },
  );
  manadaAnimal.associate = (models) => {
    manadaAnimal.belongsTo(models.Manada, {
      foreignKey: 'manada_id',
    });
  };

  return manadaAnimal;
};

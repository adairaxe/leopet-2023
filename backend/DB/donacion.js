module.exports = (sequelize, DataTypes) => {
  const donacion = sequelize.define(
    'Donacion',
    {
      donador_id: {
        type: DataTypes.INTEGER,
      },
      animal_id: {
        type: DataTypes.INTEGER,
      },
      monto: {
        type: DataTypes.INTEGER,
      },
      aprobado: {
        type: DataTypes.BOOLEAN,
      },
      pagado: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'donacion',
    },
  );

  donacion.associate = (models) => {
    donacion.belongsTo(models.Usuario, {
      foreignKey: 'donador_id',
    });
    donacion.belongsTo(models.Animal, {
      foreignKey: 'animal_id',
    });
  };

  return donacion;
};

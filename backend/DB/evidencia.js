module.exports = (sequelize, DataTypes) => {
  const Evidencia = sequelize.define(
    'Evidencia',
    {
      donacion_id: {
        type: DataTypes.INTEGER,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      galeria: {
        type: DataTypes.JSON,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'evidencia',
    },
  );

  return Evidencia;
};

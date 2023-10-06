module.exports = (sequelize, DataTypes) => {
  const Animal = sequelize.define(
    'Animal',
    {
      nombre: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      especie: {
        type: DataTypes.STRING,
      },
      raza: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      imagen: {
        type: DataTypes.STRING,
      },
      galeria: {
        type: DataTypes.JSON,
      },
      fundacion_id: {
        type: DataTypes.INTEGER,
      },
      visible: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      edad: {
        type: DataTypes.INTEGER,
      },
      peso: {
        type: DataTypes.INTEGER,
      },
      sexo: {
        type: DataTypes.BOOLEAN,
      },
      enfermedades: {
        type: DataTypes.STRING,
      },
      fecha_rescate: {
        type: DataTypes.DATE,
      },
      fecha_registro: {
        type: DataTypes.DATE,
      },
      esterilizacion: {
        type: DataTypes.BOOLEAN,
      },
      vacunacion: {
        type: DataTypes.BOOLEAN,
      },
      desparasitacion: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: 'animal',
    },
  );

  return Animal;
};

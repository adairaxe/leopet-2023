const { DataTypes } = require('sequelize');
const db = require('./index');
const Animal = require('./animal');
const Fundacion = require('./fundacion');

const ActualizacionAnimal = db.sequelize.define(
  'ActualizacionAnimal',
  {
    animal_id: {
      type: DataTypes.INTEGER,
    },
    fundacion_id: {
      type: DataTypes.INTEGER,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    estado_salud: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    calificacion: {
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
    galeria: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: 'actualizacion_animal',
  },
);

ActualizacionAnimal.associate = () => {
  ActualizacionAnimal.belongsTo(Animal, {
    foreignKey: 'animal_id',
  });
  ActualizacionAnimal.belongsTo(Fundacion, {
    foreignKey: 'fundacion_id',
  });
};

module.exports = ActualizacionAnimal;

const { DataTypes } = require('sequelize');
const db = require('./index');

const ActualizacionAnimal = require('./actualizacion_animal');
const Usuario = require('./usuario');
const Fundacion = require('./fundacion');
const Animal = require('./animal');

const Notificacion = db.sequelize.define(
  'Notificacion',
  {
    actualizacion_id: {
      type: DataTypes.INTEGER,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
    },
    fundacion_id: {
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
    visible: {
      type: DataTypes.BOOLEAN,
    },
    leido: {
      type: DataTypes.BOOLEAN,
    },
    fecha_leido: {
      type: DataTypes.DATE,
    },
    calificacion: {
      type: DataTypes.INTEGER,
    },
    fecha_calificacion: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'notificacion',
  },
);

Notificacion.associate = () => {
  Notificacion.belongsTo(ActualizacionAnimal, {
    foreignKey: 'actualizacion_id',
  });
  Notificacion.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
  });
  Notificacion.belongsTo(Fundacion, {
    foreignKey: 'fundacion_id',
  });
  Notificacion.belongsTo(Animal, {
    foreignKey: 'animal_id',
  });
};

module.exports = Notificacion;

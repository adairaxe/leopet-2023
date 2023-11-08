const db = require("../DB/index");
const { DataTypes } = require("sequelize");
const ActualizacionAnimal = require("../DB/actualizacion_animal");    

const ActualizacionGaleria = db.sequelize.define(
  'ActualizacionGaleria',
  {
    actualizacion_id: {
      type: DataTypes.INTEGER,
    },        
    url: {
        type: DataTypes.STRING,
      },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },        
  },
  {
    tableName: 'actualizacion_galeria',
  },
);

ActualizacionGaleria.associate = () => {
  ActualizacionGaleria.belongsTo(ActualizacionAnimal, {
        foreignKey: 'actualizacion_id',
    });                
};

module.exports = ActualizacionGaleria;
  
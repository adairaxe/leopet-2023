const db = require("../DB/index");
const { DataTypes } = require("sequelize");
  
const Evidencia = db.sequelize.define(
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

module.exports = Evidencia;


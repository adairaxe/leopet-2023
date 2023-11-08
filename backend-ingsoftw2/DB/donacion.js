const db = require("../DB/index");
const { DataTypes } = require("sequelize");
const Usuario = require("../DB/usuario");
const Animal = require("../DB/animal");

const Donacion = db.sequelize.define(
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

  Donacion.associate = () => {
    Donacion.belongsTo(Usuario, {
      foreignKey: 'donador_id',
    });
    Donacion.belongsTo(Animal, {
      foreignKey: 'animal_id',
    });
};

module.exports = Donacion;

const db = require("../DB/index");
const { DataTypes } = require("sequelize");
const Manada = require ("../DB/manada");

const ManadaAnimal = db.sequelize.define(
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
ManadaAnimal.associate = () => {
  ManadaAnimal.belongsTo(Manada, {
    foreignKey: 'manada_id',
  });
};

module.exports = ManadaAnimal;

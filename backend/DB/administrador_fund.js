module.exports = (sequelize, DataTypes) => {
  const AdminFund = sequelize.define(
    'AdminFund',
    {
      fundacion_id: {
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
      tableName: 'administrador_fundacion',
    },
  );

  return AdminFund;
};

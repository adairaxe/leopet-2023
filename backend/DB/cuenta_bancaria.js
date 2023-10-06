module.exports = (sequelize, DataTypes) => {
  const cuentaBancaria = sequelize.define(
    'CuentaBancaria',
    {
      banco: {
        type: DataTypes.STRING,
      },
      numero: {
        type: DataTypes.STRING,
      },
      tipo: {
        type: DataTypes.STRING,
      },
      nombre: {
        type: DataTypes.STRING,
      },
      fundacion_id: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      principal: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: 'cuenta_bancaria',
    },
  );

  return cuentaBancaria;
};

// -- ALTER TABLE integradoraDB.cuenta_bancaria ADD tipo varchar(191) AFTER numero
// -- ALTER TABLE integradoraDB.cuenta_bancaria ADD nombre varchar(191) AFTER tipo

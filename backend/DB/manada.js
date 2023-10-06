module.exports = (sequelize, DataTypes) => {
  const Manada = sequelize.define(
    'Manada',
    {
      nombre: {
        type: DataTypes.STRING,
      },
      monto: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      statusSubscription: {
        type: DataTypes.BOOLEAN,
      },
      productId: {
        type: DataTypes.STRING,
      },
      responseProduct: {
        type: DataTypes.JSON,
      },
      planId: {
        type: DataTypes.STRING,
      },
      responsePlan: {
        type: DataTypes.JSON,
      },
      subscriptionId: {
        type: DataTypes.STRING,
      },
      responseSubscription: {
        type: DataTypes.JSON,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      galeriamanada: {
        type: DataTypes.JSON,
      },
    },
    {
      tableName: 'manada',
    },
  );
  Manada.associate = (models) => {
    Manada.belongsTo(models.Usuario, {
      foreignKey: 'userId',
    });
  };
  return Manada;
};

// -- ALTER TABLE integradoraDB.manada ADD productId varchar(191) AFTER status;
// -- ALTER TABLE integradoraDB.manada ADD responseProduct JSON AFTER productId;
// -- ALTER TABLE integradoraDB.manada ADD planId varchar(191) AFTER responseProduct;
// -- ALTER TABLE integradoraDB.manada ADD responsePlan JSON AFTER planId;
// -- ALTER TABLE integradoraDB.manada ADD subscriptionId varchar(191) AFTER responsePlan;
// -- ALTER TABLE integradoraDB.manada ADD responseSubscription JSON AFTER subscriptionId;

module.exports = (sequelize, DataTypes) => {
    const Comision = sequelize.define(
      'Comision',
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
        visible: {
          type: DataTypes.BOOLEAN,
        },
        total_comision: {
            type: DataTypes.DOUBLE(11, 2),
          },
          total_pago: {
            type: DataTypes.DOUBLE(11, 2),
          },
      },
      {
        tableName: 'comision',
      },
    );
  
    return Comision;
  };
  
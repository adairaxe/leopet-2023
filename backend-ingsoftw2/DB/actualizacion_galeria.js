module.exports = (sequelize, DataTypes) => {
    const ActualizacionGaleria = sequelize.define(
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
  
    ActualizacionGaleria.associate = (models) => {
      ActualizacionGaleria.belongsTo(models.ActualizacionAnimal, {
            foreignKey: 'actualizacion_id',
        });                
    };
    return ActualizacionGaleria;
  };
  
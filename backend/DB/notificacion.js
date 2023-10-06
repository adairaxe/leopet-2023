module.exports = (sequelize, DataTypes) => {
    const Notificacion = sequelize.define(
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
  
    Notificacion.associate = (models) => {
        Notificacion.belongsTo(models.ActualizacionAnimal, {
            foreignKey: 'actualizacion_id',
        });
        Notificacion.belongsTo(models.Usuario, {
            foreignKey: 'usuario_id',
        });
        Notificacion.belongsTo(models.Fundacion, {
            foreignKey: 'fundacion_id',
        });
        Notificacion.belongsTo(models.Animal, {
            foreignKey: 'animal_id',
        });
    };
    return Notificacion;
  };
  
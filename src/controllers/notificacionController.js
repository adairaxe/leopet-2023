/* eslint-disable camelcase */
const _ = require('lodash');

const { validateRequest } = require('../helpers');
const {
  getFundacionInfo,
  parseDataNotificacion,
} = require('./helpers');

const Animal = require('../DB/animal');
const Notificacion = require('../DB/notificacion');
const ActualizacionAnimal = require('../DB/actualizacion_animal');

exports.getNotificaciones = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const result = [];
    const query = {
      where: {
        usuario_id: User.id,
        visible: true,
      },
    };
    const notificaciones = await Notificacion.findAndCountAll(query);
    const { count } = notificaciones;
    for (const notificacion of notificaciones.rows) {
      const actualizacionId = _.get(notificacion, 'actualizacion_id');
      const fundacionId = _.get(notificacion, 'fundacion_id');
      const animalId = _.get(notificacion, 'animal_id');
      const actualizacion = await ActualizacionAnimal.findOne({
        where: {
          id: actualizacionId,
        },
      });
      const fundacion = await getFundacionInfo(fundacionId);
      const animal = await Animal.findOne({
        where: {
          id: animalId,
        },
      });
      /*  const galeria = await db.ActualizacionGaleria.findAndCountAll({
        where: {
          actualizacion_id: actualizacionId,
        },
      });  */
      const data = parseDataNotificacion(notificacion, actualizacion, animal, fundacion/* ,galeria */);
      result.push(data);
    }
    const response = {
      count,
      result,
    };
    return res.send(response);
  } catch (error) {
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

exports.updateNotificacion = async (req, res) => {
  await validateRequest(req);
  try {
    const { notificacionId } = req.params;
    const {
      leido, fecha_leido, calificacion, fecha_calificacion,
    } = req.body;
    const response = {
      result: [],
    };

    const update = {
      ...(!_.isNull(leido) ? { leido } : {}),
      ...(!_.isNull(fecha_leido) ? { fecha_leido } : {}),
      ...(!_.isNull(calificacion) ? { calificacion } : {}),
      ...(!_.isNull(fecha_calificacion) ? { fecha_calificacion } : {}),
      updatedAt: Date.now(),
    };
    const notificacion = await Notificacion.update(update, {
      where: { id: notificacionId },
    });
    response.mensaje = 'Informacion actualizada.';
    response.result = notificacion;

    return res.send(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

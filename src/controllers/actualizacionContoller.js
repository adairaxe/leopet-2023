/* eslint-disable camelcase */
const _ = require('lodash');

const { validateRequest } = require('../helpers');
const {
  validateAdminFund,
  parseDataActualizacion,
  getFundacionInfo,
} = require('./helpers');

const Animal = require('../DB/animal');
const ManadaAnimal = require('../DB/manada_animal');
const Manada = require('../DB/manada');
const Rating = require('../DB/rating');
const ActualizacionAnimal = require('../DB/actualizacion_animal');

exports.createActualizacion = async (req, res) => {
  await validateRequest(req);
  try {
    const {
      descripcion,
      estado_salud,
      animal_id,
      fundacion_id,
      fecha,
      galeria,
    } = req.body;
    const notificaciones = [];
    const actualizacion = await ActualizacionAnimal.create({
      descripcion,
      estado_salud,
      animal_id,
      fundacion_id,
      fecha,
      galeria,
      visible: true,
    });
    /* if (galeria.length>0){
      galeria.forEach( async element => {
        await ActualizacionGaleria.create({
          url:element,
          actualizacion_id:actualizacion.id,
          createdAt:Date.now(),
        });
      })
    } */
    const manadasAnimal = await ManadaAnimal.findAndCountAll({
      where: {
        animal_id,
      },
    });

    for (const manadaAnimal of manadasAnimal.rows) {
      const manadaId = _.get(manadaAnimal, 'manada_id');
      const manada = await Manada.findOne({
        where: {
          id: manadaId,
        },
      });
      const donadorId = _.get(manada, 'userId');

      const notificacion = await Notificacion.create({
        actualizacion_id: actualizacion.id,
        usuario_id: donadorId,
        fundacion_id,
        animal_id,
        createdAt: Date.now(),
        visible: true,
        leido: false,
      });
      notificaciones.push(notificacion);
    }

    const response = {
      mensaje: 'Actualizacion registrada exitosamente.',
      result: actualizacion,
      result2: notificaciones,
    };
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

exports.updateActualizacion = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { actualizacionId } = req.params;
    const { descripcion, estado_salud } = req.body;

    const response = {
      result: [],
    };
    if (
      (await validateAdminFund(User.id))

    ) {
      const update = {
        ...(!_.isEmpty(descripcion) ? { descripcion } : {}),
        ...(!_.isEmpty(estado_salud) ? { estado_salud } : {}),
        ...(!_.isEmpty(galeria) ? { galeria } : {}),
        updatedAt: Date.now(),
      };
      const actualizacion = await ActualizacionAnimal.update(update, {
        where: { id: actualizacionId, fundacion_id: User.fundacionId },
      });
      response.mensaje = 'Informacion del animal actualizada.';
      response.result = actualizacion;
    }
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

exports.deleteActualizacion = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { actualizacionId } = req.params;

    if (!(await validateAdminFund(User.id))) {
      return res
        .status(401)
        .send({ error: 'No esta autorizado para realizar esta operacion!' });
    }

    let mensaje = 'Actualizacion eliminado exitosamente';
    const actualizacion = await ActualizacionAnimal.findOne({
      where: { id: actualizacionId, visible: true },
    });
    if (_.isEmpty(actualizacion)) {
      mensaje = 'Actualizacion no encontrada';
    }

    const update = {
      visible: false,
      updatedAt: Date.now(),
    };
    await ActualizacionAnimal.update(update, {
      where: { id: actualizacionId, fundacion_id: User.fundacionId },
    });
    const response = {
      mensaje,
      result: actualizacion,
    };
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

exports.getActualizaciones = async (req, res) => {
  await validateRequest(req);
  try {
    const { fundacionId } = req.query;
    const limit = parseInt(req.query.limit || '1', 10);
    const page = parseInt(req.query.page || '1', 10);
    const result = [];
    const query = {
      where: {
        fundacion_id: fundacionId,
        visible: true,
      },
      offset: (page - 1) * limit,
      limit,
    };
    const actualizaciones = await ActualizacionAnimal.findAndCountAll(query);
    const { count } = actualizaciones;
    for (const actualizacion of actualizaciones.rows) {
      const animalId = _.get(actualizacion, 'animal_id');
      // eslint-disable-next-line no-await-in-loop
      const animal = await Animal.findOne({
        where: {
          id: animalId,
        },
      });
      // eslint-disable-next-line no-await-in-loop
      const fundacion = await getFundacionInfo(fundacionId);
      /*  const galeria = await ActualizacionGaleria.findAndCountAll({
        where: {
          actualizacion_id: actualizacion.id,
        },
      });  */
      const data = parseDataActualizacion(actualizacion, animal, fundacion);
      // eslint-disable-next-line no-console
      console.log(data);
      result.push(data);
    }
    const totalPages = Math.ceil(count / limit);
    const response = {
      limit,
      page,
      totalPages,
      count,
      result,
    };
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

exports.createRating = async (req, res) => {
  await validateRequest(req);
  try {
    const {
      valor, actualizacion_id,
    } = req.body;
    const actualizacion = await Rating.create({
      valor,
      actualizacion_id,
    });
    const response = {
      mensaje: 'Rating registrado exitosamente.',
    };
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

exports.loadRating = async (req, res) => {
  await validateRequest(req);
  try {
    const {
      id,
    } = req.body;
    const { count, rows } = await Rating.findAndCountAll({
      where: {
        actualizacion_id: id,
      },
    });
    promedio = 0;
    rows.forEach((element) => {
      promedio += parseFloat(element.valor);
    });
    console.log(promedio);
    const response = {
      total_ratings: count,
      promedio_ratings: promedio / count,
    };
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

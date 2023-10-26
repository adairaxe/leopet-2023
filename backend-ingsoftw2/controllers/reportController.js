const _ = require('lodash');
const dayjs = require('dayjs');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

const db = require('../DB/index');

/**
 * Funcion para obtener reporte de las donaciones filtradas por fecha de creacion
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.getReporSuperAdmin = async (req, res) => {
  try {
    let { fecha } = req.query;
    fecha = _.replace(fecha, '/', '-');
    const date = dayjs(fecha, 'MM-YYYY').get('month');
    const startOfMonth = dayjs()
      .month(date)
      .startOf('month');
    const endOfMonth = dayjs()
      .month(date)
      .endOf('month');
    const query = {
      where: {
        aprobado: true,
        createdAt: {
          [Op.gt]: new Date(startOfMonth),
          [Op.lt]: new Date(endOfMonth),
        },
      },
      include: [
        {
          model: db.Animal,
          required: true,
        },
      ],
      attributes: [
        'animal_id',
        [sequelize.fn('sum', sequelize.col('monto')), 'total'],
      ],
      group: ['animal_id'],
      raw: true,
    };
    const responseBody = await db.Donacion.findAndCountAll(query);
    const { rows } = responseBody;
    const fundaciones = [];
    const total = [];
    for (const row of rows) {
      const fundacion = _.get(row, 'Animal.fundacion_id');
      const monto = _.toNumber(_.get(row, 'total'));
      const index = _.indexOf(fundaciones, fundacion);
      if (_.isEqual(index, -1)) {
        fundaciones.push(fundacion);
        total.push(monto);
      } else {
        let valor = _.nth(total, index);
        valor += monto;
        total[index] = valor;
      }
    }
    let count = 0;
    const donaciones = [];
    for (const id of fundaciones) {
      // eslint-disable-next-line no-await-in-loop
      const fundacion = await db.Fundacion.findOne({
        where: { id },
      });
      const data = {
        ruc: _.get(fundacion, 'id'),
        nombre: _.get(fundacion, 'nombre'),
        monto: _.nth(total, count),
      };
      donaciones.push(data);
      count += 1;
    }

    const response = {
      result: donaciones,
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

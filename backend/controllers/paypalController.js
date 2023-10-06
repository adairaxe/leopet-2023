/* eslint-disable no-console */
const _ = require('lodash');
const request = require('request');

const { changeStatus } = require('./helpers');

const db = require('../DB/index');

const auth = {
  user: process.env.PAYPAL_CLIENT,
  pass: process.env.PAYPAL_SECRET,
};

/**
 * TEST
 * Funcion de prueba para crear un producto en PayPal
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.createProduct = (req, res) => {
  const product = {
    name: 'MANADA1',
    description: 'MANADA TEST',
    type: 'SERVICE',
    category: 'SERVICES',
    image_url:
      'https://miamimundo.com/wp-content/uploads/2021/04/27-octubre-dia-del-gato-negro.jpg',
  };
  request.post(
    `${process.env.PAYPAL_URI}/v1/catalogs/products`,
    {
      auth,
      body: product,
      json: true,
    },
    (err, response) => {
      res.json({ data: response.body });
    },
  );
};

/**
 * TEST
 * Funcion de prueba para crear un plan en PayPal
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.createPlan = (req, res) => {
  const plan = {
    name: 'Plan Manada 1',
    product_id: 'PROD-72N86012AT3887120',
    status: 'ACTIVE',
    billing_cycles: [
      {
        frequency: {
          interval_unit: 'MONTH',
          interval_count: 1,
        },
        tenure_type: 'REGULAR',
        sequence: 1,
        total_cycles: 12,
        pricing_scheme: {
          fixed_price: {
            value: '40',
            currency_code: 'USD',
          },
        },
      },
    ],
    payment_preferences: {
      auto_bill_outstanding: true,
      payment_failure_threshold: 3,
    },
  };
  request.post(
    `${process.env.PAYPAL_URI}/v1/billing/plans`,
    {
      auth,
      body: plan,
      json: true,
    },
    (err, response) => {
      res.json({ data: response.body });
    },
  );
};

/**
 * TEST
 * Funcion de prueba para crear una subscripcion en PayPal
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.generateSubscription = (req, res) => {
  const subscription = {
    plan_id: 'P-62689139PY483641CMEQ42OQ',
    start_time: '2021-08-25T00:00:00Z',
    quantity: 1,
    subscriber: {
      name: {
        given_name: 'Omar',
        surname: 'Rosales',
      },
      email_address: 'edison@gmail.com',
    },
    return_url: 'http://localhost/aprobado',
    cancel_url: 'http://localhost/cancelado',
  };
  request.post(
    `${process.env.PAYPAL_URI}/v1/billing/subscriptions`,
    {
      auth,
      body: subscription,
      json: true,
    },
    (err, response) => {
      res.json({ data: response.body });
    },
  );
};

/**
 * WEBHOOK
 * Funcion de suscribirse al evento "Billing subscription actived" de PayPal, se verifica que
 * la susbscripcion haya sido aceptada por el donador y agrega el pago de la suscripcion mensual
 * a la tabla Donacion
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.verifySubscription = async (req, res) => {
  const { body } = req;
  console.log('BODY', body);
  const data = _.isEmpty(body) ? {} : body;
  const subscription = _.get(data, 'resource');
  const status = _.get(subscription, 'status');
  if (_.isEqual(status, 'ACTIVE')) {
    const subscriptionId = _.get(subscription, 'id');
    const update = {
      statusSubscription: true,
      updatedAt: Date.now(),
    };
    await db.Manada.update(update, {
      where: { subscriptionId },
    });
    const { rows, count } = await db.ManadaAnimal.findAndCountAll({
      include: [
        {
          model: db.Manada,
          where: { subscriptionId },
          required: true,
        },
      ],
      raw: true,
    });

    for (const animal of rows) {
      const donacion = {
        donador_id: _.get(animal, 'Manada.userId'),
        animal_id: _.get(animal, 'animal_id'),
        monto: _.toNumber(_.get(animal, 'Manada.monto', 0)) / count,
        aprobado: false,
        pagado: false,
      };
      // eslint-disable-next-line no-await-in-loop
      await db.Donacion.create(donacion);
      // eslint-disable-next-line no-await-in-loop
      await changeStatus(_.get(animal, 'animal_id'));
    }
  }
  res.json({ data });
};

/**
 * WEBHOOK
 * Funcion de suscribirse al evento "Billing subscription payment failed" de PayPal, se verifica si el
 * pago correspondiente a la susbscripcion fallo, en caso de fallar el statusSubscription
 * se cambiara a false para evitar irregularidades en los valores recibidos por donaciones
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.verifyPaymentFailed = async (req, res) => {
  const { body } = req;
  console.log('BODY', body);
  const data = _.isEmpty(body) ? {} : body;
  const subscription = _.get(data, 'resource');
  const event = _.get(data, 'event_type');
  console.log('EVENT', event);
  if (_.isEqual(event, 'BILLING.SUBSCRIPTION.PAYMENT.FAILED')) {
    const subscriptionId = _.get(subscription, 'id');
    const update = {
      statusSubscription: false,
      updatedAt: Date.now(),
    };
    console.log('subscriptionId', subscriptionId);
    console.log('update', update);

    await db.Manada.update(update, {
      where: { subscriptionId },
    });
  }
  res.json({ data });
};

/**
 * WEBHOOK
 * Funcion de suscribirse al evento "Billing subscription cancelled" de PayPal, se verifica que
 * la susbscripcion haya sido cancelada por el donador y se cambia el valor del campo
 * statusSubscription a false
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.verifyCancelSubscription = async (req, res) => {
  const { body } = req;
  console.log('BODY', body);
  const data = _.isEmpty(body) ? {} : body;
  const subscription = _.get(data, 'resource');
  const status = _.get(subscription, 'status');
  if (_.isEqual(status, 'CANCELLED')) {
    const subscriptionId = _.get(subscription, 'id');
    const update = {
      statusSubscription: false,
      updatedAt: Date.now(),
    };
    await db.Manada.update(update, {
      where: { subscriptionId },
    });
  }
  res.json({ data });
};

/**
 * WEBHOOK
 * Funcion para cancelar la susbscripcion a una manada
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.cancelSubscription = async (req, res) => {
  try {
    const { manadaId } = req.body;
    const subscription = {
      reason: 'No estoy satisfecho',
    };
    const manada = await db.Manada.findOne({
      where: { id: manadaId },
    });
    const subscriptionId = _.get(manada, 'subscriptionId');
    let result = {};
    if (!_.isEmpty(subscriptionId)) {
      request.post(
        `${process.env.PAYPAL_URI}/v1/billing/subscriptions/${subscriptionId}/cancel`,
        {
          auth,
          body: subscription,
          json: true,
        },
        (err, response) => {
          console.log('RESPONSE', response.body);
          result = response;
        },
      );
    }
    return res.send(result);
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

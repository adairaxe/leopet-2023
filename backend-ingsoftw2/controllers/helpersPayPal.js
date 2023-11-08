/* eslint-disable no-console */
const _ = require('lodash');
const dayjs = require('dayjs');
const axios = require('axios');
const utc = require('dayjs/plugin/utc');

const Manada = require("../DB/manada");

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: process.env.PAYPAL_CLIENT,
    password: process.env.PAYPAL_SECRET,
  },
};

/**
 * Funcion para crear un producto en PayPal, el cual se le asociara la informacion de una manada
 * @param  {Object} data
 * @return {Object} response
 */
exports.createProductManada = async (data) => {
  try {
    const product = {
      name: _.get(data, 'nombre'),
      description: 'Apadrinamiento de animales',
      type: process.env.PRODUCT_TYPE || 'SERVICE',
      category: process.env.PRODUCT_CATEGORY || 'SERVICES',
    };
    const payloadProduct = await axios.post(
      `${process.env.PAYPAL_URI}/v1/catalogs/products`,
      product,
      config,
    );
    const responseProduct = _.get(payloadProduct, 'data');
    const productId = _.get(responseProduct, 'id');
    const update = {
      productId,
      responseProduct,
      updatedAt: Date.now(),
    };
    await Manada.update(update, {
      where: { id: _.get(data, 'id') },
    });
  } catch (error) {
    console.log('ERROR', error);
    throw new Error(error);
  }
};

/**
 * Funcion para crear una subscripcion en PayPal, el cual se le asociara la informacion de un plan
 * previamente creado en PayPal
 * @param  {Object} data
 * @return {Object} response
 */
const createSubscription = async (data) => {
  try {
    const subscription = {
      plan_id: _.get(data, 'planId'),
      start_time: dayjs.extend(utc),
      quantity: 1,
      subscriber: {
        name: {
          given_name: _.get(data, 'nombres'),
          surname: _.get(data, 'apellidos'),
        },
        email_address: _.get(data, 'email'),
      },
      return_url: 'http://localhost/aprobado',
      cancel_url: 'http://localhost/cancelado',
    };
    const payloadSubscription = await axios.post(
      `${process.env.PAYPAL_URI}/v1/billing/subscriptions`,
      subscription,
      config,
    );
    const responseSubscription = _.get(payloadSubscription, 'data');
    const subscriptionId = _.get(responseSubscription, 'id');
    const update = {
      subscriptionId,
      responseSubscription,
      updatedAt: Date.now(),
    };
    await Manada.update(update, {
      where: { id: _.get(data, 'id') },
    });
    const link = _.first(_.get(responseSubscription, 'links'));
    return _.get(link, 'href');
  } catch (error) {
    console.log('ERROR', error);
    throw new Error(error);
  }
};

/**
 * Funcion para crear un plan en PayPal, el cual se le asociara la informacion de un producto
 * previamente creado en PayPal
 * @param  {Object} data
 * @return {Object} response
 */
exports.createPlanManada = async (data) => {
  try {
    const plan = {
      name: `Subscripción de la manada ${_.get(data, 'nombre')}`,
      product_id: _.get(data, 'productId'),
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
              value: _.toString(_.get(data, 'monto')),
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

    const payloadPlan = await axios.post(
      `${process.env.PAYPAL_URI}/v1/billing/plans`,
      plan,
      config,
    );
    const responsePlan = _.get(payloadPlan, 'data');
    const planId = _.get(responsePlan, 'id');
    const newData = data;
    newData.planId = planId;
    const update = {
      planId,
      responsePlan,
      updatedAt: Date.now(),
    };

    await Manada.update(update, {
      where: { id: _.get(data, 'id') },
    });
    const link = await createSubscription(newData);
    return link;
  } catch (error) {
    console.log('ERROR', error);
    throw new Error(error);
  }
};

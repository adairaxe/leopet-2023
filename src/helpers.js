const _ = require('lodash');
const { validationResult } = require('express-validator');

const reducer = (accumulator, currentValue) => {
  accumulator[currentValue.param] = accumulator[currentValue.param] || [];
  accumulator[currentValue.param].push(currentValue.msg);
  return accumulator;
};

module.exports.AsyncWrapper = (fn) =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((err) => {
      if (_.has(err, ['errors'])) {
        const { errors } = err;

        const formatedErrors = errors.reduce(reducer, {});

        return res.status(422).json(formatedErrors);
      }
      return next(err);
    });

module.exports.validateRequest = (req) =>
  new Promise((resolve, reject) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    // eslint-disable-next-line prefer-promise-reject-errors, no-promise-executor-return
      return reject({ errors: errors.array() });
    }
    // eslint-disable-next-line no-promise-executor-return
    return resolve();
  });

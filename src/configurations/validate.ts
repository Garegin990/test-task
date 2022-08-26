import { Validator } from 'node-input-validator';
import * as HttpError from 'http-errors';

interface validate{
  inputs: any,
  rules: object,
  customMessages?: object,
}

async function validate<validate>(inputs, rules, customMessages) {
  const validate = new Validator(inputs, rules, customMessages);

  const matched = await validate.check();
  if (!matched) {
    const errors = validate.errors;
    throw HttpError(400, {
      stack: 'Input validator',
      message: errors,
    });
  }
}

export default validate;
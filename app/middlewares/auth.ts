import { passport } from '../config';
import { isNotNil } from '../helpers';
import { StatusCodes } from '../helpers/status-codes';

const jwt = 'jwt';

export const auth = passport.authenticate(jwt, {
  session: false,
  failWithError: true,
});

export const fieldsInBodyRequired = (...fields: Array<string>) => (
  req,
  res,
  next
) =>
  sendErrorOrPassForward(generateFieldRequiredErrors(fields, req))(
    req,
    res,
    next
  );

export const fieldsRequired = (...fields: Array<string>) => (req, res, next) =>
  sendErrorOrPassForward(generateFieldRequiredErrors(fields, req))(
    req,
    res,
    next
  );

const sendErrorOrPassForward = errors => (req, res, next) =>
  errors.length ? res.status(StatusCodes.BAD_REQUEST).json({ errors }) : next();

const generateFieldRequiredErrors = (fields, body) =>
  fields.map(validateFieldName(body)).filter(isNotNil);

const validateFieldName = body => (fieldName: string) => {
  return !body[fieldName] || !body[fieldName].toString().trim()
    ? { [fieldName]: `${fieldName} is required!` }
    : null;
};

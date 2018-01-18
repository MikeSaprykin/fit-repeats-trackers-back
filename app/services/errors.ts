const generateError = (msg: string = '', status: number) => {
  const err = new Error(msg || 'Not found');
  err['status'] = status;
  return err;
};

const errorNotFound = (msg: string = '') => {
  throw generateError(msg, 404);
};

const errorBadRequest = (msg: string = '') => {
  throw generateError(msg, 404);
};

const errorHandlerMiddleWare = (err, req, res, next) => {
  const status = err.status || 500;
  console.error('ERROR!', err);
  res.status(status);
  res.json({
    success: false,
    message: err.message,
    errors: err.errors,
  });
};

const generateErrorMessage = (message: string = '') => ({
  success: false,
  message,
});

export default {
  errorNotFound,
  errorHandlerMiddleWare,
  errorBadRequest,
  generateErrorMessage,
};

import * as _multer from 'multer';
import { extname } from 'path';

const fileFilter = (req, file, next) => {
  const isMimeTypeSupported = /jpeg|jpg|png|gif/.test(file.mimetype);
  const isExtensionValid = /jpeg|jpg|png|gif/.test(
    extname(file.originalname).toLowerCase()
  );

  if (isMimeTypeSupported && isExtensionValid) {
    return next(null, true);
  }

  const error = new Error('File type not supported.');
  error['status'] = 400;
  next(error);
};

export const multer = _multer({
  storage: _multer.memoryStorage(),
  // fileFilter,
});

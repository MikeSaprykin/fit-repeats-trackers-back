import { tinify } from '../config';
import { extname } from 'path';
import AWSService from './aws';
import * as crypto from 'crypto';

const uploadAvatar = async (req): Promise<any> => {
  const params = generateUploadParams(
    generateAvatarFileName(req),
    req.file.buffer
  );
  await uploadAvatarToS3(params);
  return params.Key;
};

const generateAvatarFileName = (req): string => {
  const id = req.user._id.toString();
  const ext = extname(req.file.originalname).toLowerCase();
  return `${id}.${crypto.randomBytes(6).toString('hex')}${ext}`;
};

/**
 * Method to compress the image using TinyPNG. We will see if this can be used
 * @param params
 */
// const compressImage = (file): Promise<any> =>
//     new Promise((resolve, reject) =>
//         tinify.fromBuffer(file.buffer)
//             .toBuffer((e, res) => e ? reject(e) : resolve(res))
//     );

const uploadAvatarToS3 = params => AWSService.putObject(params);

const generateUploadParams = (Key: string, Body: Buffer) => ({
  ...AWSService.params,
  Body,
  Key,
});

export default {
  uploadAvatar,
};

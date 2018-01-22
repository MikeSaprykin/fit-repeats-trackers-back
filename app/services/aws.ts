import { aws, bucketName as Bucket } from '../config';

const putObject = (params): Promise<any> =>
  new Promise((resolve, reject) =>
    aws.putObject(params, (err, data) => (err ? reject(err) : resolve(data)))
  );

const params = {
  Bucket,
  ACL: 'public-read',
};

export default {
  putObject,
  params,
};

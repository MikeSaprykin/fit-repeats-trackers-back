import * as AWS from 'aws-sdk';

AWS.config.loadFromPath('./aws-config.json');
export const s3 = new AWS.S3({ region: 'eu-central-1' });

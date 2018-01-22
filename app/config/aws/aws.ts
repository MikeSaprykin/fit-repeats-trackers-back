import * as AWS from 'aws-sdk';

AWS.config.loadFromPath('./aws-config.json');
export const aws = new AWS.S3({ region: 'eu-central-1' });

export * from './bucket-name';

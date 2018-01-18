const mongoose = require('mongoose');

import { equals, always } from 'ramda';

mongoose.Promise = global.Promise;

const TESTING = 'testing';
const DEVELOP = 'develop';
const DOCKER = 'docker';

const DB_URLS = {
  [TESTING]: 'mongodb://example.com/TestingDB',
  [DEVELOP]: 'mongodb://0.0.0.0:27017/fit-repeats',
  [DOCKER]: 'mongodb://mongo:27017/fit-repeats',
};

const options = {
  useMongoClient: true,
};

const connectToMongo = () =>
  mongoose.connect(DB_URLS[process.env.NODE_ENV], options);

equals(process.env.NODE_ENV, TESTING) ? always(true) : connectToMongo();

export { mongoose };

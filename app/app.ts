import * as express from 'express';
import router from './router';
import { json } from 'body-parser';

const app = express();
app.use(json());
app.use('/', router);

export default app;

import * as express from 'express';
import * as helmet from 'helmet';
import router from './router';
import { json } from 'body-parser';
import { passport } from './config';
import ErrorsService from './services/errors';

const app = express();
app.use(json());
app.use(helmet());
app.use(passport.initialize());
app.use(ErrorsService.errorHandlerMiddleWare);
app.use('/', router);

export default app;

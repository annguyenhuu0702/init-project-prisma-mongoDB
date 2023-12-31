import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import passport from 'passport';
import { httpRequestLogger } from './middlewares/logger';
import { errorHandler } from './middlewares/request-handlers';
import { rootRouter } from './routers';
dotenv.config();

const port = process.env.PORT_DEFAULT;

const app = express();

app.use(passport.initialize());

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use(httpRequestLogger());

app.use(rootRouter);

app.use(errorHandler);

http.createServer(app).listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});

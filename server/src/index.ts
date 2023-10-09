import http from 'http';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB, WebSocketManager } from './core';
import { rootRouter } from './routers/root.router';
import { errorHandlerMW } from './middlewares';

dotenv.config({ path: path.resolve(__dirname, "..", `.env.${process.env.NODE_ENV}`) });

const PORT = process.env.PORT || 3000;

const app = express();

app.set('port', PORT);
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.WEB_APP_URL,
}));

app.use('/api', rootRouter);

app.use(errorHandlerMW);

const start = async (): Promise<http.Server> => {
  try {
    await connectDB();
    return app.listen(PORT, () => console.log('Server started on port: ' + PORT));
  } catch (error) {
    console.log(error);
  }
};

start()
  .then(server => {
    const wsManager = new WebSocketManager(server);
    wsManager.init();
  })
  .catch(err => console.log(err));

import http from 'http';
import https from 'https';
import path from 'path';
import fs from 'fs';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB, WebSocketManager } from './core';
import { rootRouter } from './routers/root.router';
import { errorHandlerMW } from './middlewares';

dotenv.config({ path: path.join(__dirname, "..", `.env.${process.env.NODE_ENV}`) });

const key = fs.readFileSync(path.join(__dirname, "..", "cert/private.key"));
const cert = fs.readFileSync(path.join(__dirname, "..", "cert/certificate.crt"));
const cred = {
  key,
  cert,
}

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
    const httpServer = app.listen(PORT, () => console.log('Server started on port: ' + PORT));
    const httpsServer = https.createServer(cred, app);
    httpsServer.listen(8443);
    return httpServer;
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

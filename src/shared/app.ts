import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import 'express-async-errors';
import { errorHandle } from '../utils/errorHandle';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
app.use(errorHandle);

export { app };

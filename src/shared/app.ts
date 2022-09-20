import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

<<<<<<< HEAD
import 'express-async-errors';
=======
>>>>>>> 1bbfca69fd342177eb4994a8ce6653e29e8842a0
import { errorHandle } from '../utils/errorHandle';
import { router } from './routes';
import swaggerDocument from './swagger.json';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);
app.use(errorHandle);

export { app };

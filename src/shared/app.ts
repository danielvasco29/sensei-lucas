import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { errorHandle } from '../utils/errorHandle';
import { router } from './routes';
import swaggerDocument from './swagger.json';

const app = express();

var options = {
    explorer: false,
    swaggerOptions: {
        docExpansion: "none",
        url: "/api-docs/swagger.json",
        persistAuthorization: true,
        filter: true
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/api-docs/swagger.json', (req, res) => res.json(swaggerDocument));
app.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));
app.use(router);
app.use(errorHandle);

export { app };

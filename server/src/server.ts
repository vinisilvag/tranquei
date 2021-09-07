/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import 'express-async-errors';
import './config/env';

import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

import { AppError } from './errors/AppError';

import './database';

import { routes } from './routes';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/terms', (request, response) => response.json({
  message: 'Termos de Serviço!',
}));

app.use(routes);

app.use((err: ErrorRequestHandler, request: Request, response: Response, _:NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error', message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error', message: 'Internal server error',
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

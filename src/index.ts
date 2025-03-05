import 'module-alias/register';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import http from 'http';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import errorHandler from '@/middlewares/error';
import userRoutes from '@/routes/user';
import { config } from '@/config';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.com'], // Allow scripts only from self & trusted CDN
    },
  }),
);

if (config.node_env === 'production') {
  app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
}

// Create HTTP Server
const server = http.createServer(app);

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.send('Server is Running!');
});

app.use('/api/v1/user', userRoutes);

app.use(errorHandler);

if (config.mongoDB) {
  mongoose
    .connect(config.mongoDB)
    .then(() => {
      console.log('Connected to MongoDB');
      server.listen(config.port, () => {
        console.log(`Express server running on port ${config.port}`);
      });
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
} else {
  console.error('MONGODB_URI is not set');
}

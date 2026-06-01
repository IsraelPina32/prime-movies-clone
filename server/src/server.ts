import express from 'express';
import helmet from 'helmet';
import cors, { type CorsOptions } from 'cors';
import { config } from '@/config/env';
import { apiLimiter } from '@/middlewares/rateLimiter';
import { errorHandler } from '@/middlewares/errorHandler';
import { getMovieDetails, getMovies } from '@/controllers/movie.controllers';

const app = express();

app.set('trust proxy', 1);

function isOriginAllowed(origin: string): boolean {
  if (config.allowedOrigins.includes(origin)) return true;
  return /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/i.test(origin);
}

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (config.nodeEnv !== 'production' || isOriginAllowed(origin)) {
      callback(null, origin);
      return;
    }

    callback(null, false);
  },
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);
app.use(express.json());
app.use(apiLimiter);

const apiRouter = express.Router();

apiRouter.get('/movies', getMovies);
apiRouter.get('/movies/:id', getMovieDetails);
app.use('/api', apiRouter);
app.use(errorHandler);

const PORT = config.port;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[Movie Prime Pro]: Senior Backend operational on port ${PORT}`);
    console.log(`[Env]: Running in ${config.nodeEnv} mode`);
  });
}

export default app;
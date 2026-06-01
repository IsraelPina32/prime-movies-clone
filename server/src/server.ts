import express from 'express';
import helmet from 'helmet';
import cors, { type CorsOptions } from 'cors';
import { config } from '@/config/env';
import { apiLimiter } from '@/middlewares/rateLimiter';
import { errorHandler } from '@/middlewares/errorHandler';
import { getMovieDetails, getMovies } from '@/controllers/movie.controllers';

const app = express();

app.set('trust proxy', 1);

app.use(helmet());

function isOriginAllowed(origin: string): boolean {
  if (config.allowedOrigins.includes(origin)) return true;

  // Allows Vercel production and preview URLs (e.g. *-username-projects.vercel.app)
  return /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/i.test(origin);
}

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (config.nodeEnv !== 'production') {
      callback(null, true);
      return;
    }

    if (!origin || isOriginAllowed(origin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
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
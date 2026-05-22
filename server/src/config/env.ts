import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

dotenv.config();

interface Config {
  port: string | number;
  omdb: {
    apiKey: string;
    baseUrl: string;
  };
  nodeEnv: string;
  isProduction: boolean;
  allowedOrigins: string[];
}

const nodeEnv = process.env.NODE_ENV || 'development';

export const config: Config = {
  port: process.env.PORT || 3001,
  omdb: {
    apiKey: process.env.OMDB_API_KEY || '',
    baseUrl: process.env.OMDB_BASE_URL || 'https://www.omdbapi.com/',
  },
  nodeEnv,
  isProduction: nodeEnv === 'production',
  
  allowedOrigins: process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : ['http://localhost:5173'] 
};
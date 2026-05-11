import datenv from 'dotenv';
import path from 'path';

datenv.config();

export const config = {
    port: process.env.PORT || 3001,
    omdb: {
        apiKey: process.env.OMDB_API_KEY?.trim() || '',
        baseURL: 'https://www.omdbapi.com/'
    },
    isProduction: process.env.NODE_ENV === 'production',
};
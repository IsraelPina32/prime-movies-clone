import datenv from 'dotenv';
import path from 'path';

datenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const config = {
    port: process.env.PORT || 3001,
    omdb: {
        apiKey: process.env.OMDB_API_KEY?.trim() || '',
        baseUrl: 'https://www.omdbapi.com/'
    },
    nodeEnv: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    
};
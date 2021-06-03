require('dotenv').config();
const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_PORT
} = process.env;

module.exports = {
    development: {
        username: DB_USERNAME || 'postgres',
        password: DB_PASSWORD || 'postgres',
        database: DB_NAME || 'google-flight-scrap-dev',
        host: DB_HOST || '127.0.0.1',
        port: DB_PORT || '5432',
        dialect: "postgres",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    production: {
        username: DB_USERNAME || 'postgres',
        password: DB_PASSWORD || 'postgres',
        database: DB_NAME || 'google-flight-scrap',
        host: DB_HOST || '127.0.0.1',
        port: DB_PORT || '5432',
        dialect: "postgres",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};
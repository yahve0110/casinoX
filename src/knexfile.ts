import dotenv from 'dotenv';
import path from 'path';
import { Knex } from 'knex';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const isCompiled = __dirname.includes('dist');

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'auth_user',
    password: process.env.DB_PASSWORD || 'supersecure',
    database: process.env.DB_NAME || 'auth_db',
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
    extension: isCompiled ? 'js' : 'ts',
  },
};

export default config;

import { Pool } from 'pg';

const pool = new Pool({
  user: '<usuario>',
  host: 'localhost',
  database: '<dbname>',
  password: '<password>',
  port: 5432,
});

export const query = (text: string, params: any[]) => pool.query(text, params);

import { Pool } from 'pg';
import configuration from 'src/config/configuration';

const pool = new Pool(configuration().database);

const createTable = async () => {
    const client = await pool.connect();

    client.query(
        `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
      updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
      UNIQUE(email)
    )`,
        (err) => {
            if (err) {
                console.log(err);
            }
        },
    );

    client.query(
        `CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            tags TEXT,
            status VARCHAR(100) NOT NULL,
            userId INTEGER,
            createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
            updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
            FOREIGN KEY (userId) REFERENCES users(id)
        )`,
        (err) => {
            if (err) {
                console.log(err);
            }
        },
    );
};

export default createTable;

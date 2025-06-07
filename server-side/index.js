const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { Pool } = require('pg');

dotenv.config(); // Load .env file

const app = express();

app.use(cors());
app.use(express.json());

const { PORT, PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false, // typically needed if using services like Heroku
    },
});

app.get('/', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM user_auth');
        console.log(result.rows); // .rows has the actual data
        res.json(result.rows);    // send data back to client
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

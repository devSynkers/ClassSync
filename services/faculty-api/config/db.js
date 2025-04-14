
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Railway URL
    ssl: { rejectUnauthorized: false }, // Required for Railway
});

// 🟢 Optional: confirm connection once at startup
pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL successfully!'))
    .catch(err => console.error('❌ DB connection error:', err));

const db = {
    query: async (text, params) => {
        try {
            const res = await pool.query(text, params);
            console.log('✅ Query Success:', text);
            return res;
        } catch (err) {
            console.error('❌ Query Error:', { text, params, message: err.message });
            throw err;
        }
    },

    transaction: async (callback) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            console.log('✅ Transaction committed');
            return result;
        } catch (err) {
            await client.query('ROLLBACK');
            console.error('❌ Transaction Error:', err.message);
            throw err;
        } finally {
            client.release();
        }
    },
};

export default db;
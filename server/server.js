import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const { Pool } = pg;

// DB configuration from environment variables
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD === undefined ? '' : process.env.DB_PASSWORD,
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5432'),
};

const targetDatabase = process.env.DB_DATABASE || 'luminouspower';

// Function to initialize database and table
async function initDB() {
  if (process.env.DATABASE_URL) {
    // For cloud environments (like Render), connect directly using the connection string
    const appPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    try {
      // Create base table
      await appPool.query(`
        CREATE TABLE IF NOT EXISTS contact_requests (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          company VARCHAR(255),
          email VARCHAR(255) NOT NULL,
          project VARCHAR(100) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Run migrations to ensure newer columns exist
      await appPool.query(`ALTER TABLE contact_requests ADD COLUMN IF NOT EXISTS phone VARCHAR(50)`);
      await appPool.query(`ALTER TABLE contact_requests ADD COLUMN IF NOT EXISTS location VARCHAR(255)`);
      await appPool.query(`ALTER TABLE contact_requests ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'New'`);
      await appPool.query(`ALTER TABLE contact_requests ADD COLUMN IF NOT EXISTS priority VARCHAR(50) DEFAULT 'Medium'`);

      console.log(`Table 'contact_requests' structure verified in production DB.`);
    } catch (err) {
      console.error('Error verifying table structure in production DB:', err.message);
    } finally {
      await appPool.end();
    }
    return;
  }

  // Local DB setup
  // 1. Connect to default 'postgres' database to ensure target database exists
  const sysPool = new Pool({ ...dbConfig, database: 'postgres' });
  try {
    const res = await sysPool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [targetDatabase]
    );
    if (res.rowCount === 0) {
      console.log(`Database '${targetDatabase}' does not exist. Creating...`);
      await sysPool.query(`CREATE DATABASE "${targetDatabase}"`);
      console.log(`Database '${targetDatabase}' created successfully.`);
    } else {
      console.log(`Database '${targetDatabase}' already exists.`);
    }
  } catch (err) {
    console.error('Error checking/creating database:', err.message);
  } finally {
    await sysPool.end();
  }

  // 2. Connect to the target database and ensure table exists with required columns
  const appPool = new Pool({ ...dbConfig, database: targetDatabase });
  try {
    // Create base table
    await appPool.query(`
      CREATE TABLE IF NOT EXISTS contact_requests (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        project VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Run migrations to ensure newer columns exist
    await appPool.query(`ALTER TABLE contact_requests ADD COLUMN IF NOT EXISTS phone VARCHAR(50)`);
    await appPool.query(`ALTER TABLE contact_requests ADD COLUMN IF NOT EXISTS location VARCHAR(255)`);
    await appPool.query(`ALTER TABLE contact_requests ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'New'`);
    await appPool.query(`ALTER TABLE contact_requests ADD COLUMN IF NOT EXISTS priority VARCHAR(50) DEFAULT 'Medium'`);

    console.log(`Table 'contact_requests' structure verified.`);
  } catch (err) {
    console.error('Error verifying table structure:', err.message);
  } finally {
    await appPool.end();
  }
}

// Run database initialization
await initDB();

// Create application database connection pool
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : new Pool({ ...dbConfig, database: targetDatabase });

// POST route: Add new request
app.post('/api/requests', async (req, res) => {
  const { name, company, email, phone, location, project, message, status, priority } = req.body;
  if (!name || !email || !project || !message) {
    return res.status(400).json({ error: 'Name, email, project, and message are required.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO contact_requests (name, company, email, phone, location, project, message, status, priority)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        name,
        company || null,
        email,
        phone || null,
        location || null,
        project,
        message,
        status || 'New',
        priority || 'Medium'
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting request:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET route: Fetch all requests (sorted by created_at DESC)
app.get('/api/requests', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM contact_requests ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching requests:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH route: Update request status
app.patch('/api/requests/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'Status is required.' });
  }

  try {
    const result = await pool.query(
      `UPDATE contact_requests SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating status:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE route: Delete a request
app.delete('/api/requests/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM contact_requests WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json({ message: 'Request deleted successfully', deleted: result.rows[0] });
  } catch (err) {
    console.error('Error deleting request:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: targetDatabase });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

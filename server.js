import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let latestResult = null;

app.post('/scan', async (req, res) => {
  const n8nUrl = process.env.N8N_URL;
  const apiKey = process.env.N8N_API_KEY;

  if (!n8nUrl || !apiKey) {
    return res.status(500).json({ error: 'Server configuration missing' });
  }

  try {
    const response = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`n8n responded with ${response.status}: ${text}`);
    }

    const data = await response.json();
    latestResult = data;
    res.json(data);
  } catch (err) {
    console.error('Scan error:', err);
    res.status(500).json({ error: 'Failed to start scan' });
  }
});

app.get('/results', (req, res) => {
  if (!latestResult) {
    return res.status(404).json({ error: 'No results available' });
  }
  res.json(latestResult);
});

// Serve the React build files
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

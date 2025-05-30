import express from 'express';
import { readTotal } from './storage';

const app = express();
const PORT = 3000;

app.get('/total', async (req, res) => {
  const total = await readTotal();
  res.json({ total });
});

app.listen(PORT, () => {
  console.log(`📦 REST API running on http://localhost:${PORT}`);
});

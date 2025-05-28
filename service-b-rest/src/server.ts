import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

const filePath = path.join(__dirname, '../total.txt');

app.get('/total', (req, res) => {
  let total = 0;

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    total = parseInt(content || '0', 10);
  }

  res.json({ total });
});

app.listen(PORT, () => {
  console.log(`📦 REST API running on http://localhost:${PORT}`);
});

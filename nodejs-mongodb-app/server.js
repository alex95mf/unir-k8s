const express = require('express');
const connectDB = require('./db');

const app = express();
const PORT = 3000;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

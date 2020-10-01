const express = require('express');
const connectDB = require('./config/db')

const app = express();

// Connection Initialized to DB
connectDB()

app.get('/', (req, res) => {
  res.json({
    data: true,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const express = require('express');
const connectDB = require('./config/db')

const app = express();

// Connection Initialized to DB
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Define Routes
app.use('/devconnector/api/v1/users', require('./routes/api/users'))
app.use('/devconnector/api/v1/auth', require('./routes/api/auth'))
app.use('/devconnector/api/v1/profile', require('./routes/api/profile'))
app.use('/devconnector/api/v1/posts', require('./routes/api/posts'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

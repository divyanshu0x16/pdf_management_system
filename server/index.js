const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8000;

app.use(express.json());
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

// Connection URI for MongoDB Atlas cluster
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_URL}`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

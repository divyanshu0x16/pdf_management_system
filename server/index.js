const express = require('express');
const app = express();
const port = 8000;

const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
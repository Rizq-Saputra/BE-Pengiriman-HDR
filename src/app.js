const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const supirAuthRoutes = require('./routes/supirAuthRoutes');
const barangRoutes = require('./routes/barangRoutes');
const pelangganRoutes = require('./routes/pelangganRoutes');
const supirRoutes = require('./routes/supirRoutes');
const kendaraanRoutes = require('./routes/kendaraanRoutes');
const pengirimanRoutes = require('./routes/pengirimanRoutes');
const detailPengirimanRoutes = require('./routes/detailPengirimanRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Allow requests from http://localhost:3000
app.use(cors({
  origin: '*', // Allow requests from your Next.js frontend
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

app.use(bodyParser.json());

// Configure morgan to log requests
// app.use(morgan('combined'));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// filepond routes
app.use('/api/uploads', uploadRoutes);

// Register routes
app.use("/api/auth", authRoutes);
app.use('/api/supir/auth', supirAuthRoutes);
app.use('/api', barangRoutes);
app.use('/api', pelangganRoutes);
app.use('/api', supirRoutes);
app.use('/api', kendaraanRoutes);
app.use('/api', pengirimanRoutes);
app.use('/api', detailPengirimanRoutes);

module.exports = app;

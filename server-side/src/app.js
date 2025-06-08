const express = require('express');
const userRoutes = require('./routes/auth')
require('dotenv').config();
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',userRoutes)

module.exports = app

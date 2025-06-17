const express = require('express');
const userRoutes = require('./routes/auth')
const taskRoutes = require('./routes/task')

require('dotenv').config();
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',userRoutes)
app.use('/api',taskRoutes)


module.exports = app

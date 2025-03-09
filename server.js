const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
require('dotenv').config();

app.use(cors());

const path = require('path');
const dbConfig = require(path.join(__dirname, './config/dbConfig'));

const port = process.env.PORT || 5000;
app.use(express.json());

const usersRoute = require('./routes/usersRoute');
const busesRoute = require('./routes/busesRoute');
const bookingsRoute = require('./routes/bookingsRoute');

app.use('/api/users', usersRoute);
app.use('/api/buses', busesRoute);
app.use('/api/bookings', bookingsRoute);

app.listen(port, () => console.log(`Node server Listening on port ${port}`));

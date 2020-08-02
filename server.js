const express = require('express');
const doctorsRouter = require('./doctors/doctorsRouter.js');
const appointmentsRouter = require('./appointments/appointmentsRouter.js');

const server = express();

server.use(express.json());

server.use('/api/doctors', doctorsRouter);
server.use('/api/appointments', appointmentsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Notable-web-api-challenge' });


});

module.exports = server;
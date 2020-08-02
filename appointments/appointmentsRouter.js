const express = require('express');

const Appointments = require('../data/helpers/appointmentModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Appointments.get()
    .then(appointments => {
        res.status(200).json(appointments);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Error retrieving appointments' });
    });
});

router.get('/:id', validateAppointmentId, (req, res) => {
    Appointments.get(req.params.id)
    .then(appointment => {
        if (appointment) {
            res.status(200).json(appointment)
        } else {
            res.status(400).json({ message: 'appointment not found' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Could not retrieve appointment' });
    });
});

router.post("/", validateAppointment, (req, res, next) => {
    const newAppointment = req.body;

    appointmentDb.insert(newAppointment)
        .then(appointment => {
            res.status(201).json(appointment);
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error creating the appointment." });
        })
}); 

router.put("/:id", validateAppointment, (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    Appointments.update(id, changes)
        .then(updated => {
            if(updated) {
                res.status(200).json(updated);
            } else {
                next({ code: 404, message: "appointment Id not found." });
            }
        })
        .catch(err => {
           res.status(500).json({ message: "There was an error updating the appointment." });
        });
});

router.delete("/:id", (req, res, next) => {
    const { id } = req.params;

    Appointments.remove(id)
        .then(count => {
            res.status(200).json("appointment deleted");
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error removing the appointment." });
        })
});


function validateAppointmentId(req, res, next) {
    const { id } = req.params.id
    Appointments.get(id)
    .then(appointment => {
        if (appointment) {
            req.appointment = appointment;
            next();
        } else {
            res.status(400).json({ message: "Not a vaild appointment ID" });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Failed to process request' })
    });
};

function validateAppointment(req, res, next) {
    if (req.body.description && req.body.date){
        console.log('y')
        req.body.project_id = 1
        next();
    } else if (!req.body.description || !req.body.date){
        res.status(400).json({ message: 'Missing required description of doctor and appointment info' })
    } else if (!req.body){
        res.status(400).json({ message: 'Need info!' });
    };
    if (req.body.description && req.body.time){
        console.log('y')
        req.body.project_id = 1
        next();
    } else if (!req.body.description || !req.body.time){
        res.status(400).json({ message: 'Missing required description of doctor and appointment info' })
    } else if (!req.body){
        res.status(400).json({ message: 'Need info!' });
    };
}

module.exports = router;
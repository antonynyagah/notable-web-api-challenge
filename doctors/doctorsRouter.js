const express = require('express');

const router = express.Router();

const Doctors = require('../data/helpers/doctorModel.js');
const Appointments = require('../data/helpers/appointmentModel.js');

// GET request for doctors
router.get('/', async (req, res) => {
    const doctors = await Doctors.get();

    try {
        res.status(200).json(doctors);
    }
    catch {
        res.status(500).json({ error: 'The doctors information could not be retrieved' });
    }
});

// Post new doctor
router.post('/', validateDoctor, (req, res) => {
    Doctors.insert(req.body)
    .then(doctor => {
        res.status(201).json(doctor);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message })
    })
});

// GET by ID
router.get('/:id', validateDoctorId, (req, res) => {
    res.status(200).json(req.doctor)
});

// PUT request to update doctor
router.put('/:id', validateDoctorId, (req, res) => {
    Doctors.update(req.params.id, req.body)
    .then(doctor => {
        if (doctor) {
            res.status(200).json(doctor)
        } else {
            res.status(404).json({ message: 'The doctor could not be found' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Could not update doctors' });
    });
})

// DELETE request for doctor
router.delete('/:id', validateDoctorId, (req, res) => {
    Doctors.remove(req.params.id)
    .then(doctor => {
        if (doctor === 1) {
            res.status(200).json({ message: `doctor has been deleted` });
        } else {
            res.status(404).json({ message: 'The doctor could not be found' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'doctor could not be removed' });
    })
})

// GET request for doctor appointments
router.get('/:id/appointments', validateDoctorId, (req, res, next) => {
    const { id } = req.params
    Doctors.getDoctorAppointments(id)
    .then(appointments => {
        res.status(200).json(appointments)
    })
    .catch(error => {
        res.status(500).json({ message: 'Error getting the appointments for the doctor' });
    });
});

router.post('/:id/appointments', validateAppointment, (req, res) => {
    const appointments = {...req.body, doctor_id: req.body.doctor_id};

    Appointments.insert(appointments)
    .then(post => {
        res.status(210).json(post);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error sending the post info' });
    });
});




// middleware functions

function validateDoctor(req, res, next) {
    if (req.body.firstname){
        next();
    } else if (Object.keys(req.body).length < 1) {
        res.status(400).json({ message: 'Missing doctors data' })
    } else if (!req.body.name) {
        res.status(400).json({ message: 'Missing name' });
    }
}

function validateDoctorId(req, res, next) {
    const { id } = req.params;
    doctors.get(id)
    .then(doctor => {
        if (doctor) {
            req.doctor = doctor;
            next();
        } else {
            res.status(400).json({ message: 'Not a valid doctor ID' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Error connecting to doctors' });
    });
}

function validateAppointment(req, res, next) {
    const { id } = req.params;
    if (req.body.date&& req.body.time){
        req.body.doctor_id = id
        next();
    } else if (!req.body.date|| !req.body.time){
        res.status(400).json({ message: 'Missing required dateof doctor and date' })
    } else if (!req.body){
        res.status(400).json({ message: 'Need info!' });
    };
}

module.exports = router;
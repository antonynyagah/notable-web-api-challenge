const db = require("../dbConfig.js");
const mappers = require("./mappers");

module.exports = {
  get,
  insert,
  update,
  remove,
  getDoctorAppointments,
};

function get(id) {
  let query = db("doctors as d");

  if (id) {
    query.where("d.id", id).first();

    const promises = [query, getDoctorAppointments(id)]; // [ doctors, appointments ]

    return Promise.all(promises).then(function(results) {
      let [doctor, appointments] = results;

      if (doctor) {
        doctor.appointments = appointments;

        return mappers.doctorToBody(doctor);
      } else {
        return null;
      }
    });
  } else {
    return query.then(doctors => {
      return doctors.map(doctor => mappers.doctorToBody(doctor));
    });
  }
}

function insert(doctor) {
  return db("doctors")
    .insert(doctor, "id")
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db("doctors")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db("doctors")
    .where("id", id)
    .del();
}

function getDoctorAppointments(doctorId) {
  return db("appointments")
    .where("doctor_id", doctorId)
    .then(appointments => appointments.map(appointment => mappers.appointmentToBody(appointment)));
}


module.exports = {
  intToBoolean,
  booleanToint,
  doctorToBody,
  actionToBody,
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function doctorToBody(doctor) {
  const result = {
    ...doctor,
    completed: intToBoolean(doctor.completed),
  };

  if (doctor.appointments) {
    result.appointments = doctor.appointments.map(appointment => ({
      ...appointment,
      completed: intToBoolean(appointment.completed),
    }));
  }

  return result;
}

function actionToBody(appointment) {
  return {
    ...appointment,
    completed: intToBoolean(appointment.completed),
  };
}

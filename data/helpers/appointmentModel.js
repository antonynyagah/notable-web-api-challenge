const db = require('../dbConfig.js');
const mappers = require('./mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
};

function get(id) {
  let query = db('appointments');

  if (id) {
    return query
      .where('id', id)
      .first()
      .then((appointment) => {
        if (appointment) {
          return mappers.actionToBody(appointment);
        } else {
          return null;
        }
      });
  } else {
    return query.then((appointments) => {
      return appointments.map((appointment) => mappers.actionToBody(appointment));
    });
  }
}

function insert(appointment) {
  return db('appointments')
    .insert(appointment, 'id')
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db('appointments')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db('appointments').where('id', id).del();
}


exports.seed = function(knex) {
  return knex('appointments').insert([
    {
      project_id: 1,
      date: '8/2/2020',
      patientfirstname: 'tony',
      patientlastname: 'tone',
      time:
        '8:15 A.M.',
    },
    {
      project_id: 1,
      date: '8/2/2020',
      patientfirstname: 'tony',
      patientlastname: 'tone',
      time:
        '8:30 A.M.',
    },
    {
      project_id: 1,
      date: '8/2/2020',
      patientfirstname: 'tony',
      patientlastname: 'tone',
      time:
        '8:45 A.M.',
    },
  ]);
};

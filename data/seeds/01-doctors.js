exports.seed = function(knex, Promise) {
  return knex('doctors').insert([
    {
      firstname: 'tony',
      lastname: 'tone'

      
    },
  ]);
};

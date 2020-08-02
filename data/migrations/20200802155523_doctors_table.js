exports.up = function(knex) {
    return knex.schema.createTable("doctors", function(doctors) {
        doctors.increments();

        doctors.string("firstname", 128).notNullable();
        doctors.string("lastname", 128).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("doctors");
};

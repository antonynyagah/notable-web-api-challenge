exports.up = function(knex) {
    return knex.schema.createTable("appointments", function(appointments) {
        appointments.increments();

        appointments
            .integer("doctor_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("doctors")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        appointments.string("patientfirstname", 128).notNullable();
        appointments.string("patientlastname", 128).notNullable();
        appointments.string("date", 128).notNullable();
        appointments.string("time").notNullable();
        appointments.string("New PatientorFollow up").notNullable();

        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("appointments");
};

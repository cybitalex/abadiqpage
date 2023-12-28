exports.up = function (knex) {
  return knex.schema.createTable("timesheet", function (table) {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.timestamp("clock_in").notNullable();
    table.timestamp("clock_out");

    // Add a composite unique constraint for (username, clock_in) pair
    table.unique(["username", "clock_in"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("timesheet");
};

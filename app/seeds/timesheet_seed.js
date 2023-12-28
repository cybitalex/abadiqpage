// 01_timesheet_seed.js
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("timesheet")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("timesheet").insert([
        {
          username: "alex_moran",
          clock_in: new Date("2023-01-01T08:00:00"),
          clock_out: new Date("2023-01-01T17:00:00"),
        },
        // Add more seed entries as needed
      ]);
    });
};

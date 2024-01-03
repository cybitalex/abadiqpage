exports.seed = function (knex) {
  return knex("users").insert([
    { username: "abby", password: "queensfinest", isAdmin: true },
    { username: "dmaria", password: "2024iqm", isAdmin: false },
  ]);
};

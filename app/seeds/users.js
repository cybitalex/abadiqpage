exports.seed = function (knex) {
  return knex("users").insert([
    { username: "aaa", password: "1234" }, // Replace with a hashed password
  ]);
};

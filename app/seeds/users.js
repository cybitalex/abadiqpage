exports.seed = function (knex) {
  return knex("users").insert([
    { username: "abby", password: "loveofmylife", isAdmin: true }, // Replace with a hashed password
  ]);
};

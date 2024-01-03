const bcrypt = require("bcrypt");

exports.seed = function (knex) {
  // Hash the passwords using bcrypt
  const abbyPasswordHash = bcrypt.hashSync("loveofmylife", 10);
  const dmariaPasswordHash = bcrypt.hashSync("2024iqmd", 10);

  return knex("users").insert([
    { username: "abby", password: abbyPasswordHash, isAdmin: true },
    { username: "dmaria", password: dmariaPasswordHash, isAdmin: false },
  ]);
};

// knexfile.js
module.exports = {
  development: {
    client: "pg",
    connection: {
      user: "postgres",
      password: "tar6*down",
      database: "clockingsystem",
      host: "64.225.56.183",
      port: 5432,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    // client: 'pg',
  },
};

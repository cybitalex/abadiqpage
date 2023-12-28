const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const client = new Client({
  user: "postgres",
  host: "64.225.56.183",
  database: "clockingsystem",
  password: "tar6*down",
  port: 5432,
});

client.connect();

// Create a table if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS timesheet (
    id SERIAL PRIMARY KEY,
    user_id INT,
    username VARCHAR(255),  -- Assuming you have a username column
    clock_in TIMESTAMP,
    clock_out TIMESTAMP
  );
`;

client.query(createTableQuery, (err, res) => {
  if (err) {
    console.error("Error creating table", err);
  } else {
    console.log("Table created successfully");
  }
});

// Middleware to make the 'client' variable accessible globally
app.use((req, res, next) => {
  req.client = client;
  next();
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = {
    text: "SELECT id FROM users WHERE username = $1 AND password = $2",
    values: [username, password],
  };

  req.client.query(query, (err, result) => {
    if (err) {
      console.error("Error during login query", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    } else {
      if (result.rows.length === 1) {
        const userId = result.rows[0].id;
        res.json({ success: true, userId });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    }
  });
});

app.post("/clock-in", async (req, res) => {
  const { username } = req.body;
  const clock_in = new Date();

  const query = {
    text: "INSERT INTO timesheet(username, clock_in) VALUES($1, $2) RETURNING *",
    values: [username, clock_in],
  };

  try {
    const result = await req.client.query(query);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/clock-out", async (req, res) => {
  const { username } = req.body;
  const clock_out = new Date();

  const query = {
    text: "UPDATE timesheet SET clock_out = $1 WHERE username = $2 AND clock_out IS NULL RETURNING *",
    values: [clock_out, username],
  };

  try {
    const result = await req.client.query(query);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

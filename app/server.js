const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const cors = require("cors");
const app = express();
const port = 3001;
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextapp = next({ dev });
const bcrypt = require("bcrypt");
const handle = nextapp.getRequestHandler();
const path = require("path");
nextapp.prepare().then(() => {
  app.use(bodyParser.json());
  app.use(cors());

  const client = new Client({
    user: "postgres",
    host: "abadiqback.duckdns.org",
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
  const allowedOrigins = ["http://abadiq.com", "https://abadiq.com"];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );
  // Middleware to make the 'client' variable accessible globally
  app.use((req, res, next) => {
    req.client = client;
    next();
  });

  client.query(createTableQuery, (err, res) => {
    if (err) {
      console.error("Error creating table", err);
    } else {
      console.log("Table created successfully");
    }
  });

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const loginQuery = {
      text: 'SELECT id, "isAdmin", password FROM users WHERE username = $1',
      values: [username],
    };

    try {
      const loginResult = await req.client.query(loginQuery);

      if (loginResult.rows.length === 1) {
        const user = loginResult.rows[0];
        const userId = user.id;
        const isAdmin = user.isAdmin;
        const hashedPassword = user.password; // Get the hashed password from the database

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
          const statusQuery = {
            text: "SELECT * FROM timesheet WHERE username = $1 ORDER BY clock_in DESC LIMIT 1",
            values: [username],
          };
          const statusResult = await req.client.query(statusQuery);
          const lastEntry = statusResult.rows[0];

          const isClockedIn = lastEntry && !lastEntry.clock_out;

          res.json({ success: true, userId, isClockedIn, isAdmin });
        } else {
          res.json({ success: false, message: "Invalid credentials" });
        }
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during login query", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  });

  // Middleware to check if the user is an admin
  function isAdmin(req, res, next) {
    const { username } = req.body;

    // Check if the user with the given username is an admin
    const isAdminQuery = {
      text: "SELECT isAdmin FROM users WHERE username = $1",
      values: [username],
    };

    req.client.query(isAdminQuery, (err, result) => {
      if (err) {
        console.error("Error checking admin status", err);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      } else {
        const isAdmin = result.rows[0]?.isadmin || false;

        if (isAdmin) {
          // User is an admin, proceed to the admin portal
          next();
        } else {
          // User is not an admin, return an unauthorized response
          res.status(403).json({ success: false, message: "Unauthorized" });
        }
      }
    });
  }

  // Admin route to fetch admin data
  app.get("/admin", isAdmin, async (req, res) => {
    const { username } = req.body;

    // Fetch admin data as needed
    // Modify the SQL query to fetch relevant information from the timesheet table

    const adminDataQuery = {
      text: "SELECT * FROM timesheet", // Modify this query as needed
    };

    try {
      const adminDataResult = await req.client.query(adminDataQuery);
      const adminData = adminDataResult.rows;

      res.json({ success: true, isAdmin: true, adminData });
    } catch (error) {
      console.error("Error during admin data query", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  });

  app.post("/clock-in", async (req, res) => {
    const { username } = req.body;
    // Check if the user is already clocked in
    const checkQuery = {
      text: "SELECT * FROM timesheet WHERE username = $1 ORDER BY clock_in DESC LIMIT 1",
      values: [username],
    };

    try {
      const checkResult = await req.client.query(checkQuery);
      const lastEntry = checkResult.rows[0];

      // If the user's last clock-in has no clock-out, they're already clocked in
      if (lastEntry && !lastEntry.clock_out) {
        res.status(400).json({ message: "User already clocked in" });
      } else {
        // Proceed with clocking in
        // Convert the current time to EST before inserting it
        const currentTimestamp = new Date().toLocaleString("en-US", {
          timeZone: "America/New_York", // Set the timezone to EST
        });

        const query = {
          text: "INSERT INTO timesheet(username, clock_in) VALUES($1, $2) RETURNING *",
          values: [username, currentTimestamp], // Use the converted timestamp
        };
        const result = await req.client.query(query);
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error("Error executing clock-in query", error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.post("/clock-out", async (req, res) => {
    const { username } = req.body;

    // Check the user's last clock-in to ensure they can clock out
    const checkQuery = {
      text: "SELECT * FROM timesheet WHERE username = $1 ORDER BY clock_in DESC LIMIT 1",
      values: [username],
    };

    try {
      const checkResult = await req.client.query(checkQuery);
      const lastEntry = checkResult.rows[0];

      // Ensure there is a clock-in to clock out from
      if (lastEntry && !lastEntry.clock_out) {
        // Proceed with clocking out
        // Convert the current time to EST before inserting it as the clock-out time
        const currentTimestamp = new Date().toLocaleString("en-US", {
          timeZone: "America/New_York", // Set the timezone to EST
        });

        const query = {
          text: "UPDATE timesheet SET clock_out = $1 WHERE id = $2 RETURNING *",
          values: [currentTimestamp, lastEntry.id], // Use the converted timestamp
        };
        const result = await req.client.query(query);
        res.json(result.rows[0]);
      } else {
        res
          .status(400)
          .json({ message: "User not clocked in or already clocked out" });
      }
    } catch (error) {
      console.error("Error executing clock-out query", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.use(express.static("public")); // Serve static files (e.g., CSS, images)
  // Add this route before app.listen() at the end of your code
  app.get("/api/admin/users", async (req, res) => {
    try {
      // Fetch the list of users along with their clock-in and clock-out info from your database
      const getUsersQuery = {
        text: `
          SELECT u.id, u.username, t.clock_in, t.clock_out
          FROM users u
          LEFT JOIN timesheet t ON u.username = t.username
        `,
      };

      const getUsersResult = await req.client.query(getUsersQuery);
      const users = getUsersResult.rows;

      // Convert timestamps to EST
      const usersInEST = users.map((user) => {
        return {
          id: user.id,
          username: user.username,
          clock_in: new Date(user.clock_in).toLocaleString("en-US", {
            timeZone: "America/New_York",
          }),
          clock_out:
            user.clock_out === null
              ? null
              : new Date(user.clock_out).toLocaleString("en-US", {
                  timeZone: "America/New_York",
                }),
        };
      });
      app.get("/api/admin/hours-worked", isAdmin, async (req, res) => {
        try {
          // SQL query to calculate hours and minutes worked for each row
          const hoursWorkedQuery = `
            SELECT
              id,
              username,
              clock_in,
              clock_out,
              EXTRACT(EPOCH FROM (clock_out - clock_in)) / 3600.0 AS hours_worked
            FROM timesheet;
          `;

          const hoursWorkedResult = await req.client.query(hoursWorkedQuery);
          const hoursWorkedData = hoursWorkedResult.rows;

          res.json({ success: true, hoursWorkedData });
        } catch (error) {
          console.error("Error calculating hours worked", error);
          res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }
      });

      res.json(usersInEST);
    } catch (error) {
      console.error("Error fetching users for admin portal", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  });

  // Custom catch-all route for Next.js pages
  app.all("*", (req, res) => {
    return handle(req, res);
  });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

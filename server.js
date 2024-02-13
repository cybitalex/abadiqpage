const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const cors = require("cors");
const app = express();
const port = 3001;
const PDFDocument = require("pdfkit");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextapp = next({ dev });
const bcrypt = require("bcrypt");
const handle = nextapp.getRequestHandler();
const path = require("path");
nextapp.prepare().then(() => {
  app.use(bodyParser.json());
  // app.use(cors());

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
  const allowedOrigins = [
    "http://abadiq.com",
    "https://abadiq.com",
    "http://localhost:3000",
  ];

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
    console.log("Username in login is", username);
    const loginQuery = {
      text: "SELECT isadmin, password FROM users WHERE username = $1",
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
          req.username = username;

          // Passwords match, indicating successful login
          const statusQuery = {
            text: "SELECT * FROM timesheet WHERE username = $1 ORDER BY clock_in DESC LIMIT 1",
            values: [username],
          };
          const statusResult = await req.client.query(statusQuery);
          const lastEntry = statusResult.rows[0];

          const isClockedIn = lastEntry && !lastEntry.clock_out;

          res.json({ success: true, userId, isClockedIn, isAdmin }); // Include isAdmin in the response
        } else {
          // Passwords do not match, indicating invalid credentials
          res.json({ success: false, message: "Invalid credentials" });
        }
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
    const { username } = req.query;
    console.log("Username in isAdmin function is", username);
    const isAdminQuery = {
      text: "SELECT isadmin FROM users WHERE username = $1",
      values: [username],
    };

    req.client.query(isAdminQuery, (err, result) => {
      if (err) {
        console.error("Error checking admin status", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      } else {
        const isAdmin = result.rows[0]?.isadmin || false;

        if (isAdmin) {
          return next();
        } else {
          return res
            .status(403)
            .json({ success: false, message: "Unauthorized" });
        }
      }
    });
  }

  // Admin route to fetch admin data
  app.get("/admin", async (req, res) => {
    const { username } = req.query;

    // Query the database to get the user's ID based on the username
    const userIdQuery = {
      text: "SELECT id FROM users WHERE username = $1",
      values: [username],
    };

    try {
      const userIdResult = await req.client.query(userIdQuery);
      const userId = userIdResult.rows[0]?.id;
      console.log(userId);
      if (!userId) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Now that you have the user's ID, query the database to check if the user is an admin
      const isAdminQuery = {
        text: "SELECT isadmin FROM users WHERE id = $1",
        values: [userId],
      };

      const isAdminResult = await req.client.query(isAdminQuery);
      const isAdmin = isAdminResult.rows[0]?.isadmin || false;

      if (isAdmin) {
        res.json({ success: true, isAdmin });
      } else {
        res.status(403).json({ success: false, message: "Unauthorized" });
      }
    } catch (error) {
      console.error("Error during admin data query", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  });
  app.get("/generate-pdf", async (req, res) => {
    try {
      // Get username and date range from query parameters
      const { username, startDate, endDate } = req.query;

      // Validate the parameters (you can add more validation logic as needed)
      if (!username || !startDate || !endDate) {
        return res.status(400).json({ error: "Invalid parameters" });
      }

      // Parse the date strings into JavaScript Date objects
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);

      // Add your database query here to fetch the user's clock-in and clock-out records
      // within the specified date range and calculate the total hours worked.
      // You may need to adjust the SQL query accordingly.

      // Example SQL query (you need to modify this query based on your database schema):
      const query = {
        text: `
          SELECT
            SUM(EXTRACT(EPOCH FROM (clock_out - clock_in)) / 3600.0) AS total_hours_worked
          FROM timesheet
          WHERE username = $1
            AND clock_in >= $2
            AND clock_out <= $3
        `,
        values: [username, parsedStartDate, parsedEndDate],
      };

      const result = await req.client.query(query);
      const totalHoursWorked = result.rows[0].total_hours_worked;

      const doc = new PDFDocument();

      const filename = "user_hours_summary.pdf";

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );

      // Create a writable stream to pipe the PDF content to the response
      doc.pipe(res);

      // Add content to the PDF document, including the total hours worked
      doc.fontSize(16).text("User Hours Summary", { align: "center" });
      doc
        .fontSize(12)
        .text(`Total Hours Worked: ${totalHoursWorked.toFixed(2)} hours`);

      // Finalize the PDF document
      doc.end();

      // Log the PDF generation
      console.log(`Generated PDF: ${filename}`);
    } catch (error) {
      console.error("Error generating PDF", error);
      res.status(500).send("Internal Server Error");
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

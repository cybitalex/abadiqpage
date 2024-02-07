// pages/api/generate-pdf.js

import { NextApiRequest, NextApiResponse } from "next";
const PDFDocument = require("pdfkit");
const fs = require("fs");
const { Client } = require("pg");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, startDate: rawStartDate, endDate: rawEndDate } = req.query;

  // Check if userId is provided
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required." });
  }

  // Parse start and end dates, providing default values if they're undefined
  const startDate = rawStartDate
    ? new Date(rawStartDate as string)
    : new Date();
  let endDate = rawEndDate ? new Date(rawEndDate as string) : new Date();

  // Adjust the end date to include the selected day
  endDate.setDate(endDate.getDate() + 1);

  // Create a new PDF document
  const doc = new PDFDocument();

  // Initialize a connection to your PostgreSQL database
  const client = new Client({
    user: "postgres",
    host: "abadiqback.duckdns.org",
    database: "clockingsystem",
    password: "tar6*down",
    port: 5432,
  });

  await client.connect();

  // Query the database to retrieve the username
  const userQuery = {
    text: `
      SELECT username FROM users WHERE id = $1
    `,
    values: [userId],
  };

  // Query the database to fetch timesheet data
  const query = {
    text: `
      SELECT 
        username,
        clock_in,
        clock_out,
        EXTRACT(EPOCH FROM (clock_out - clock_in)) / 3600.0 AS hours_worked
      FROM timesheet
      WHERE username = (
        SELECT username FROM users WHERE id = $1
      )
        AND clock_in >= $2
        AND clock_out <= $3
    `,
    values: [userId, startDate, endDate],
  };

  try {
    // Retrieve the username from the database
    const userResult = await client.query(userQuery);
    const username = userResult.rows[0]?.username || "Unknown User";

    // Fetch timesheet data
    const result = await client.query(query);
    const timesheetData = result.rows;

    // Calculate total days worked and total hours worked
    const totalDaysWorked = timesheetData.length;
    let totalHoursWorked = 0;
    timesheetData.forEach((row) => {
      totalHoursWorked += row.hours_worked;
    });

    // Pipe the PDF to the response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=user_hours_summary.pdf"
    );
    doc.pipe(res);

    // Add content to the PDF
    const logoPath = "pages/api/logo.png"; // Replace with the path to your logo
    const logoWidth = 200; // Adjust as needed
    const logoHeight = 200; // Adjust as needed
    const centerX = (doc.page.width - logoWidth) / 2;
    const topY = 1; // Adjust as needed

    doc.image(logoPath, centerX, topY, {
      width: logoWidth,
      height: logoHeight,
    });

    // Add space below the logo for the text
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.text(`${username}`, {
      align: "center",
    });

    doc.moveDown();
    doc.text("Timesheet Data:");
    doc.moveDown();
    timesheetData.forEach((row) => {
      doc.text(`Username: ${row.username}`);
      doc.text(`Clock In: ${row.clock_in}`);
      doc.text(`Clock Out: ${row.clock_out}`);
      doc.text(`Hours Worked: ${row.hours_worked.toFixed(2)} hours`);
      doc.moveDown();
    });

    // Add total days worked and total hours worked
    doc.moveDown();
    doc.text(`Total Days Worked: ${totalDaysWorked}`);
    doc.text(`Total Hours Worked: ${totalHoursWorked.toFixed(2)} hours`);

    // End the PDF document
    doc.end();
  } catch (error) {
    console.error("Error querying the database", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    await client.end(); // Close the database connection
  }
}

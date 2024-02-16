import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const GeneratePDFButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(""); // Selected user ID
  const [startDate, setStartDate] = useState(""); // Start date for date range
  const [endDate, setEndDate] = useState(""); // End date for date range
  const [userOptions, setUserOptions] = useState<
    { id: string; username: string }[]
  >([]);

  useEffect(() => {
    // Fetch user options from your API or database and populate the dropdown
    const fetchUserOptions = async () => {
      try {
        const response = await fetch("https://abadiqback.duckdns.org/api/admin/users");
        // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setUserOptions(data);
        } else {
          throw new Error("Failed to fetch user options");
        }
      } catch (error) {
        console.error("Error fetching user options", error);
      }
    };
    fetchUserOptions();
  }, []);

  useEffect(() => {
    // Log the selected user when userOptions change
    if (userId) {
      const selectedUser = userOptions.find(
        (user) => user.id.toString() === userId
      );
      console.log("Selected User:", selectedUser);
    }
  }, [userId, userOptions]);

  const generatePDF = async () => {
    try {
      setIsLoading(true);

      // Validate user and date inputs before making the request
      if (!userId || !startDate || !endDate) {
        alert("Please select a user and specify a valid date range.");
        setIsLoading(false);
        return;
      }

      // Make an HTTP request to your /generate-pdf route with query parameters
      const response = await fetch(
        `/api/generate-pdf?userId=${userId}&startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        // If the response is successful, create a blob and open it in a new tab for download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "user_hours_summary.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (error) {
      console.error("Error generating PDF", error);
      alert("Error generating PDF. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>User Hours PDF Generator</h1>
      <div>
        <label>Select User:</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">Select a user</option>
          {userOptions
            .filter(
              (user, index, self) =>
                self.findIndex((u) => u.id === user.id) === index
            )
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button
        onClick={generatePDF}
        disabled={isLoading}
        style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
      >
        {isLoading ? "Generating PDF..." : "Generate PDF"}
      </button>
    </div>
  );
};

export default GeneratePDFButton;

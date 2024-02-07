// PDFGenerationModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PDFGenerationModal = ({ show, onHide }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    const fetchUserOptions = async () => {
      try {
        const response = await fetch(
          "https://abadiqback.duckdns.org/api/admin/users"
        );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!userId || !startDate || !endDate) {
        alert("Please select a user and specify a valid date range.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `https://abadiqback.duckdns.org/api/generate-pdf?userId=${userId}&startDate=${startDate}&endDate=${endDate}`,
        { method: "GET" }
      );

      if (response.ok) {
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
    <Modal show={show} onHide={onHide} centered className="custom-pdf-modal">
      <Modal.Header closeButton>
        <Modal.Title>Generate PDF</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="userId">
            <Form.Label>Select User</Form.Label>
            <Form.Control
              as="select"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              <option value="">Select a user</option>
              {userOptions.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Generating PDF..." : "Generate PDF"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PDFGenerationModal;

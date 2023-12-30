import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const LoginModal = ({ show, onHide }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      // Simple client-side validation
      if (!credentials.username || !credentials.password) {
        setError("Please enter both username and password.");
        setLoading(false); // Ensure to stop loading if validation fails
        return;
      }

      console.log("Sending login request with username:", credentials.username);

      // Make sure to send data in the correct JSON format
      const response = await axios.post("http://localhost:3001/login", {
        username: credentials.username,
        password: credentials.password,
      });

      if (response.data.success) {
        setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
        // Remove auto clock-in and modal close
        console.log("Logged in successfully, user can now clock in or out.");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [field]: value,
    }));
  };
  const handleClockIn = async () => {
    try {
      // Make a POST request to clock-in the user
      const clockInResponse = await axios.post(
        "http://localhost:3001/clock-in",
        {
          username: credentials.username, // sending the logged-in username
        }
      );
      // Handle success - perhaps update state or notify user
      console.log("Clocked In Successfully:", clockInResponse.data);
      // You might want to update the UI or state here
    } catch (error) {
      console.error("Error clocking in:", error);
      // Handle errors - show user a message or log
    }
  };

  const handleClockOut = async () => {
    try {
      // Make a POST request to clock-out the user
      const clockOutResponse = await axios.post(
        "http://localhost:3001/clock-out",
        {
          username: credentials.username, // sending the logged-in username
        }
      );
      // Handle success
      console.log("Clocked Out Successfully:", clockOutResponse.data);
      // You might want to update the UI or state here
    } catch (error) {
      console.error("Error clocking out:", error);
      // Handle errors - show user a message or log
    }
  };

  return (
    <Modal show={show} onHide={onHide} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            className="btn-light-purple"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          {isLoggedIn && (
            <>
              <Button variant="success" onClick={handleClockIn}>
                Clock In
              </Button>
              <Button variant="danger" onClick={handleClockOut}>
                Clock Out
              </Button>
            </>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;

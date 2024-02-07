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
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleAdminButtonClick = () => {};
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      if (!credentials.username || !credentials.password) {
        setError("Please enter both username and password.");
        setLoading(false);
        return;
      }

      console.log("Sending login request with username:", credentials.username);

      const response = await axios.post(
        "https://abadiqback.duckdns.org/login",
        {
          username: credentials.username,
          password: credentials.password,
        }
      );

      if (response.data.success) {
        setIsLoggedIn(true);
        setIsClockedIn(response.data.isClockedIn);

        // Send a GET request to the /admin route with the username as a query parameter
        const adminResponse = await axios.get(
          "https://abadiqback.duckdns.org/admin",
          {
            params: { username: credentials.username },
          }
        );
        setIsAdmin(adminResponse.data.isAdmin);

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
      const clockInResponse = await axios.post(
        "https://abadiqback.duckdns.org/clock-in",
        {
          username: credentials.username,
        }
      );
      console.log("Clocked In Successfully:", clockInResponse.data);
      setIsClockedIn(true); // Set the user as clocked in
      alert("Clocked In Successfully"); // Show success notification
      onHide();
      window.location.reload();
    } catch (error) {
      console.error("Error clocking in:", error);
    }
  };

  const handleClockOut = async () => {
    try {
      const clockOutResponse = await axios.post(
        "https://abadiqback.duckdns.org/clock-out",
        {
          username: credentials.username, // sending the logged-in username
        }
      );
      console.log("Clocked Out Successfully:", clockOutResponse.data);
      setIsClockedIn(false);
      alert("Clocked Out Successfully");
      onHide();
      window.location.reload();
    } catch (error) {
      console.error("Error clocking out:", error);
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
              <Button
                variant="success"
                onClick={handleClockIn}
                disabled={isClockedIn}
              >
                Clock In
              </Button>
              <Button
                variant="danger"
                onClick={handleClockOut}
                disabled={!isClockedIn}
              >
                Clock Out
              </Button>
              {isAdmin && (
                <Button variant="info" onClick={handleAdminButtonClick}>
                  Admin Button
                </Button>
              )}
            </>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;

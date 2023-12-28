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
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      // Simple client-side validation
      if (!credentials.username || !credentials.password) {
        setError("Please enter both username and password.");
        return;
      }

      console.log("Sending login request with username:", credentials.username);

      // Make sure to send data in the correct JSON format
      const response = await axios.post(
        "http://localhost:3001/login",
        credentials
      );

      if (response.data.success) {
        const userId = response.data.userId;

        // Now you can use the userId for further operations, such as clocking in
        const clockInResponse = await axios.post(
          "http://localhost:3001/clock-in",
          {
            user_id: userId,
          }
        );

        console.log("Clock-in response:", clockInResponse.data);

        // Close the modal after successful clock-in
        onHide();
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
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;

import React, { useState } from "react";

const EmployeeLoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    // You can send the username and password to the server for authentication
  };

  return (
    <div className={`employee-login-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Employee Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EmployeeLoginModal;

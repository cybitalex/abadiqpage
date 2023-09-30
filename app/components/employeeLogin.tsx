import React, { useState } from "react";
import AddStaff from "../../../clocking_app/clocking_system/src/components/formData";

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
        <AddStaff />
      </div>
    </div>
  );
};

export default EmployeeLoginModal;

import React, { useState, useEffect } from "react";

const AdminPortal = () => {
  const [users, setUsers] = useState<any[]>([]); // Use 'any[]' as the type

  useEffect(() => {
    // Fetch the list of users who have clocked in and out from your API or database
    fetch("/api/admin/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
      });
  }, []);

  return (
    <div>
      <h1>Welcome to the Admin Portal</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Clock In</th>
            <th>Clock Out</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.clock_in || "N/A"}</td>
              <td>{user.clock_out || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPortal;

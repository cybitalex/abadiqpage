import React, { useState } from "react";
import axios from 'axios';

export const AddStaff = () => {
  let [name, setName] = useState('');

  const nameUpdate = (event) => {
    // Deals with name field changes to update state
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting by default

    const postURL = 'http://138.197.101.21:8080/staff';

   // Get the current date in 'YYYY-MM-DD' format
   const currentDate = new Date().toISOString().split('T')[0];
   const data = {
    name: name,
    date: currentDate,
    clockedIn: false,
    dates: [],
  }; 

    // Make the POST request using Axios
    axios.post(postURL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      // Once posted, the user is notified
      alert("You have been added to the system!");
    })
    .catch((error) => {
      console.error('Error making POST request:', error);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Full Name: </label>
        <input
          required
          onChange={nameUpdate}
          value={name} // Bind the input value to the 'name' state
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddStaff;


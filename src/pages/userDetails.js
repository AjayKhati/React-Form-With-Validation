import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UserDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div>
        No user data found. <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2>User Details</h2>
      {Object.entries(state).map(([key, value]) => (
        <p key={key}>
          <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
        </p>
      ))}
      <button onClick={() => navigate("/")}>Back to Form</button>
    </div>
  );
}

export default UserDetails;

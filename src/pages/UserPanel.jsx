import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function UserPanel() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.user_metadata.role}</p>
    </div>
  );
}
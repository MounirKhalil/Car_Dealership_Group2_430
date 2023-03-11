import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

function SignIn() {
  const { handleSignIn, user } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    handleSignIn(email, password);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Sign In</button>
      </form>
      {user && (
        <div>
          <p>Welcome, {user.email}!</p>
          {user.isAdmin && (
            <p>
              <Link to="/admin_panel">Admin Panel</Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SignIn;

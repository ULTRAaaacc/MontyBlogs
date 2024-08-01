import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="nav">
      {isAuthenticated && <Link to="/">Home</Link>}
      {isAuthenticated ? (
        <>
          <Link to="/create">Create Blog</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;

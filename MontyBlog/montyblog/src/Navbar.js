import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
function Navbar() {
  //chnage it to check cookies
  // const isAuthenticated = !!Cookie.get("token");
  const [isAuthenticated, setisAuthenticated] = useState("");

  const handleLogout = () => {
    // call logout api
    // localStorage.removeItem("token");
    // window.location.href = "/login";

    Cookie.remove("token");
    window.location.href = "/login";
  };
  useEffect(() => {
    const jwt = Cookie.get("token");
    if (jwt) {
      setisAuthenticated(true);
      console.log(jwt);
    }
  }, []);

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

///////////////////////////////////////////
/////////////////////////////////////////
////////////////////////////////////////////////
/////////////////////////////////////////
///////////////////////////////////////////////
////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Cookie from "js-cookie";
// import axiosInstance from "./apis/axiosInstance";

// function Navbar() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [username, setUsername] = useState("");

//   const handleLogout = async () => {
//     try {
//       await axiosInstance.post("/auth/logout"); // Call the logout API
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//     Cookie.remove("token");
//     setIsAuthenticated(false);
//     window.location.href = "/login";
//   };

//   useEffect(() => {
//     const jwt = Cookie.get("token");
//     if (jwt) {
//       setIsAuthenticated(true);
//       const variable = localStorage.getItem("username");
//       setUsername(variable);

//       // // Fetch username from the server if needed
//       // const fetchUsername = async () => {
//       //   try {
//       //     const response = await axiosInstance.post("/auth/login"); // Fetch username or adapt if necessary
//       //     setUsername(response.data.username);
//       //   } catch (error) {
//       //     console.error("Fetch username error:", error);
//       //   }
//       // };
//       // fetchUsername();
//     }
//   }, []);

//   return (
//     <nav className="nav">
//       {isAuthenticated && <Link to="/">Home</Link>}
//       {isAuthenticated ? (
//         <>
//           <Link to="/create">Create Blog</Link>
//           <span style={{ color: "white" }}>Welcome, {username}</span>
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <Link to="/login">Login</Link>
//           <Link to="/register">Register</Link>
//         </>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

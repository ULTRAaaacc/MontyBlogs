// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import Home from "./Home";
// import BlogDetails from "./BlogDetails";
// import Create from "./Create";
// import Edit from "./Edit";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import NotFound from "./NotFound";
// import Navbar from "./Navbar";
// import "./index.css";
// function App() {
//   const isAuthenticated = !!localStorage.getItem("token");

//   return (
//     <Router>
//       <Navbar />
//       <div className="content">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route
//             path="/blogs/:id"
//             element={
//               isAuthenticated ? <BlogDetails /> : <Navigate to="/login" />
//             }
//           />
//           <Route
//             path="/create"
//             element={isAuthenticated ? <Create /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/edit/:id"
//             element={isAuthenticated ? <Edit /> : <Navigate to="/login" />}
//           />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import BlogDetails from "./BlogDetails";
import Create from "./Create";
import Edit from "./Edit";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import "./index.css";
import Cookie from "js-cookie";

function App() {
  //const isAuthenticated = !!localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cookie = Cookie.get("token");
    setIsAuthenticated(cookie);
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/blogs/:id"
            element={
              isAuthenticated ? <BlogDetails /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/create"
            element={isAuthenticated ? <Create /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/:id"
            element={isAuthenticated ? <Edit /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

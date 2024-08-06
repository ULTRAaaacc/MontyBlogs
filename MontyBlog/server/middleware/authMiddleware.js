// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   // Extract token from cookies
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("Token verification error:", error); // Added logging
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("Token verification error:", error);
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;

///////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////////////////////////////////////////////////////////
/////////////////////////////////////////////////////
///////////////////////////////////////////////////

//ADDING SWAGGER
// authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("Cookies:", req.cookies); // Add this line to debug cookies

  const token = req.cookies ? req.cookies.token : null; // Check if req.cookies is defined

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

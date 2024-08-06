// const express = require("express");
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/authRoutes");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();
// const blogRoutes = require("./routes/BlogRoutes");
// const swaggerRouter = require("./swagger/swagger"); // Import the Swagger router

// const app = express();

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("MongoDB connection error:", err));

// app.use(express.json());
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cookieParser());
// app.use("/api/auth", authRoutes);
// app.use("/api/blogs", blogRoutes);

// // Use Swagger router
// app.use("/api-docs", swaggerRouter);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// ADDING SWAGGER

// app.js
const express = require("express");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const authMiddleware = require("./middleware/authMiddleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

// Swagger configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "API documentation for the Blog app",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/BlogRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

startServer();

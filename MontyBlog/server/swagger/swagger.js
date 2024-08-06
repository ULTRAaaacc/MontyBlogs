// // swagger.js
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// // Define the Swagger documentation options
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "My API",
//       version: "1.0.0",
//       description: "API documentation for my project",
//     },
//     servers: [
//       {
//         url: "http://localhost:5000/api", // Adjust to your server's URL
//         description: "Development server",
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//     security: [
//       {
//         bearerAuth: [],
//       },
//     ],
//   },
//   apis: ["./routes/*.js"],
// };

// // Initialize Swagger documentation
// const specs = swaggerJsdoc(options);

// module.exports = {
//   swaggerUi,
//   specs,
// };

///////////////////////////////////////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Blog API",
    version: "1.0.0",
    description: "A simple Express API for managing blogs",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ["./routes/BlogRoutes.js"], // Paths to files with API annotations
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

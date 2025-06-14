const fs = require("fs");
const swaggerAutogen = require("swagger-autogen")();
const dotenv = require("dotenv").config();

const doc = {
  info: {
    title: "Location API",
    description: "API documentation for the Location service",
  },
  host: process.env.SWAGGER_HOST || "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/**/*.js"];

// Clear existing swagger.json
fs.writeFileSync(outputFile, "", "utf8");

// Regenerate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc);

const swaggerAutogen = require("swagger-autogen")();
const dotenv = require("dotenv").config();

const doc = {
  info: {
    title: "Location API",
    description: "API documentation for the Location service",
  },
  host: process.env.SWAGGER_HOST || "localhost:3000",
  schemes: process.env.NODE_ENV === "production" ? "http" : "https",
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);

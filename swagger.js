const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Location API",
    description: "API documentation for the Location service",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);

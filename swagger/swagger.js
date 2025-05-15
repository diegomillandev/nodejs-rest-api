import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js REST API",
      version: "1.0.0",
      description: "Node.js REST API, Express, MongoDB, Swagger Docs.",
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
    contact: {
      name: "Diego Millan",
      email: "diegomillandev@gmail.com",
    },
    servers: [
      {
        url: "http://localhost:4000/api/v1",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/**/*.js"],
};

const specs = swaggerJSDoc(options);
export default specs;

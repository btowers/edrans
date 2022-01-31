const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    version: '1.0.0',
    title: 'Edrans Challenge API',
    description: 'Documentation for Edrans Challenge API',
  },
  host: 'localhost:8080',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'User',
      description: 'Endpoints',
    },
  ],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  definitions: {
    Parents: {
      father: 'Simon Doe',
      mother: 'Marie Doe',
    },
    User: {
      name: 'Jhon Doe',
      age: 29,
      parents: {
        $ref: '#/definitions/Parents',
      },
      diplomas: [
        {
          school: 'XYZ University',
          year: 2020,
          completed: true,
          internship: {
            hours: 290,
            location: 'XYZ Company',
          },
        },
      ],
    },
    AddUser: {
      $name: 'Jhon Doe',
      $age: 29,
      about: '',
    },
  },
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/index.ts']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // require('./src/index.ts')
})

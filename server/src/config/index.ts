import dotenv from 'dotenv'
import { Presistence } from '../utils/enums'
dotenv.config()

const venv = {
  MODE: process.env.MODE || 'cluster',
  NODE_ENV: process.env.NODE_ENV || 'development',
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || 'images',
  AWS_ACCESS_KEYid: process.env.AWS_ACCESS_KEYid,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secretKey',
  TOKEN_KEEP_ALIVE: process.env.TOKEN_KEEP_ALIVE || '36000000',
  PORT: process.env.PORT || 8080,
  DB_TYPE: Number(process.env.DB_TYPE) || Presistence.MongoDBSaaS,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || 'test',
  MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI || 'clusterUrl',
  MONGO_LOCAL_URI: process.env.MONGO_LOCAL_URI || 'mongodb://localhost:27017/ecommerce',

  mailer: {
    adminMail: process.env.ADMIN_EMAIL || 'brianfiuba@gmail.com',
    from: process.env.MAILER_FROM || 'brian@aurube.com',
    transport: 'sendgrid',
    smtp: process.env.SMTP_TRANSPORT,
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY || 'apikey',
    },
  },

  swaggerOptions: {
    definition: {
      openapi: '1.0.0',
      info: {
        title: 'Edrans Challenge',
        version: '0.0.1',
        description:
          'This is a simple CRUD API application made with Express and documented with Swagger',

        contact: {
          name: 'Brian',
          url: 'https://github.com/btowers',
          email: 'brian@towers.ar',
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT',
        },
      },

      servers: [
        {
          url: 'http://localhost:8080',
          description: 'Development server',
        },
      ],
    },
    apis: ['server/src/docs/*'],
  },
}

export default venv

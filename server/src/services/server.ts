import * as http from 'http'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import history from 'connect-history-api-fallback'
import apiRouter from '../routes'
import passport from './authenticator'
import config from '../config'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const app = express()

// 1 - Security
app.use(helmet())
app.use(cors())
app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src *; font-src 'self'; img-src * blob:;script-src 'self'; style-src 'self'; frame-src 'self'"
  )
  next()
})

// 2 - Compression
app.use(compression())

// 3 - View Engine
app.set('view engine', 'html')
app.set('trust proxy', true)

// 4 - Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// 5 - Authentication (Passport JWT)
app.use(passport.initialize())

// 6 - Routing
app.use('/api', apiRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(config.swaggerOptions)))
app.use(history())
app.use(express.static(path.resolve(__dirname, '../../public')))

// 7 - Create Server
const server = http.createServer(app)

export default server

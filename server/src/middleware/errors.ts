import { loggerS } from '../services/logger'
import { ErrorRequestHandler } from 'express'
import config from '../config'

interface IErrorInfo {
  error: string
  name: string
  message: string
  descripcion?: string
  stack: string
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode, name, message, error, stack, descripcion } = err
  const errorInfo: IErrorInfo = {
    error,
    name,
    message,
    stack,
  }
  if (descripcion) {
    errorInfo.descripcion = descripcion
  }
  if (config.NODE_ENV !== 'test')
    loggerS.error(`Error: ${error}, Message: ${message}, Stack: ${stack} `)

  res.status(statusCode || 500).json(errorInfo)
}

import { Request, Response, NextFunction } from 'express'
import { loggerS } from '../services/logger'
import { ErrorCode } from '../utils/enums'

class ErrorsMiddleware {
    errors(err: Error, req: Request, res: Response, next: NextFunction) {
        loggerS.error(err.message)
        if (err.message == ErrorCode.ProductsNotFound) {
            res.status(404).json({ error: err.message })
        } else if (err.message == ErrorCode.UserNotFound) {
            res.status(401).json({ error: err.message })
        } else if (err.message == ErrorCode.CartNotFound) {
            res.status(404).json({ error: err.message })
        } else if (err.message == ErrorCode.Unauthorized) {
            res.status(401).json({ error: err.message })
        } else if (err.message == ErrorCode.NotAuthenticated) {
            res.status(401).json({ error: err.message })
        } else if (err.message == ErrorCode.AlreadyAuthenticated) {
            res.status(400).json({ error: err.message })
        } else if (err.message == ErrorCode.BadRequest) {
            res.status(400).json({ error: err.message })
        } else if (err.message == ErrorCode.InvalidPassword) {
            res.status(401).json({ error: err.message })
        } else res.status(400).json({ error: err.message })
    }
}

export const ErrorsM = new ErrorsMiddleware()

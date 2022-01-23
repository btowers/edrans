import multer from 'multer'
import { v4 as uuid } from 'uuid'
import 'express-async-errors'

const DIR = './public/temp'

class ImageMiddleware {
    storage: multer.StorageEngine
    uploadImage: multer.Multer

    constructor() {
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, DIR)
            },
            filename: (req, file, cb) => {
                const fileName = uuid() + '.' + file.originalname.split('.')[1]
                cb(null, fileName)
            },
        })

        this.uploadImage = multer({
            storage: this.storage,
            fileFilter: (req, file, cb) => {
                if (
                    file.mimetype == 'image/png' ||
                    file.mimetype == 'image/jpg' ||
                    file.mimetype == 'image/jpeg'
                ) {
                    cb(null, true)
                } else {
                    cb(null, false)
                    return cb(new Error('Only .png, .jpg and .jpeg format allowed'))
                }
            },
        })
    }
}

export const imageM = new ImageMiddleware()

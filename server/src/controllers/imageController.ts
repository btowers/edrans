import { NextFunction, Request, Response } from 'express'
import { S3 } from '../services/S3'
import { productS } from '../api/productService'
import { v4 as uuidv4 } from 'uuid'
import 'express-async-errors'

class ImageController {
  deleteImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { filename, productId } = req.body
    await S3.deleteImages([filename])
    await productS.deleteImageFromProduct(productId, filename)
    res.status(200).json({ data: { message: 'Image deleted' } })
  }

  getPresignedUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const fileName = uuidv4() + '.' + req.body.type
    const url = await S3.getPresignedUrl(fileName)
    await productS.updateImagesProduct(req.body.productId, fileName)
    res.status(200).json({ data: url })
  }
}

export const imageC = new ImageController()

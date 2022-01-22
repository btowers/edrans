import { NextFunction, Request, Response } from "express";
import { imageS } from "../services/image";
import { productS } from "../api/productService";
import "express-async-errors";

/**
 * @class ImageController
 */
class ImageController {
  /**
   * @description Upload Image
   * @param {Request} req
   * @param {Response} res
   * @param  {NextFunction} next
   */
  uploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const filename = await imageS.saveImage(req.file!);
    await productS.updateImagesProduct(req.body.id, filename);
    res.status(200).json({ data: filename });
  };

  /**
   * @description Delete image
   * @param {Request} _req
   * @param {Response} res
   * @param  {NextFunction} next
   */
  deleteImage = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { filename, productId } = res.locals.body;
    await imageS.deleteImages([filename]); // check if it works
    await productS.deleteImageFromProduct(productId, filename);
    res.status(200).json({ data: { message: "Image deleted" } });
  };
}

export const imageC = new ImageController();

/**
 * @openapi
 * /api/image:
 *   post:
 *     summary: Upload an Image
 *     tags:
 *      - Image
 *     responses:
 *      200:
 *        description: Returns the filename of the uploaded image
 *     parameters:
 *      - name: file
 *        in: formData
 *        description: Image to upload
 *        required: true
 *        type: file
 *      - name: id
 *        in: formData
 *        description: ID of the product where the image is added
 *        required: true
 *        schema:
 *          type: string
 *   delete:
 *    summary: Delete an image
 *    tags:
 *      - Image
 *    responses:
 *      200:
 *       description: Returns a success message
 *    parameters:
 *     - name: imageToDelete
 *       in: body
 *       description: Object with id of the product ID and quantity to add
 *       required: true
 *       schema:
 *          $ref: "#/definitions/imageToDelete"
 *
 * definitions:
 *  imageToDelete:
 *   type: "object"
 *   properties:
 *     filename:
 *       type: "string"
 *     productId:
 *       type: "string"
 *   required: ["filename", "productId"]
 *   examples:
 *       productId: "5e9f8f8f-b8f8-4f8f-8f8f-8f8f8f8f8f8f"
 *       filename: "image.jpg"
 *
 */

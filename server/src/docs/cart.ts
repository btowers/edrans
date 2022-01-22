/**
 * @openapi
 * /api/cart:
 *   get:
 *     summary: Get the Cart of the user
 *     tags:
 *      - Cart
 *     responses:
 *       200:
 *         description: Returns the cart of a user
 *
 * /api/cart/add:
 *   post:
 *    summary: Add a product to a Cart
 *    tags:
 *      - Cart
 *    responses:
 *      201:
 *       description: Returns the updated cart
 *    parameters:
 *     - name: product
 *       in: body
 *       description: Object with id of the product ID and quantity to add
 *       required: true
 *       schema:
 *          $ref: "#/definitions/productAddRemove"
 *
 * /api/cart/delete:
 *   delete:
 *    summary: Delete a product from a Cart
 *    tags:
 *      - Cart
 *    responses:
 *      201:
 *       description: Returns the updated cart
 *    parameters:
 *     - name: product
 *       in: body
 *       description: Object with id of the product ID and quantity to delete
 *       required: true
 *       schema:
 *          $ref: "#/definitions/productAddRemove"
 *
 * definitions:
 *  productAddRemove:
 *   type: "object"
 *   properties:
 *     product:
 *       type: "string"
 *     quantity:
 *      type: "number"
 *   required: ["product", "quantity"]
 *
 */

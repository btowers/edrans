/**
 * @openapi
 * /api/products:
 *   get:
 *    summary: Returns all the products
 *    tags:
 *      - Products
 *    components:
 *      securitySchemes:
 *       BearerAuth:
 *        type: http
 *        scheme: bearer
 *    responses:
 *      201:
 *       description: An array of products
 *   post:
 *    summary: Create a new product
 *    tags:
 *      - Products
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      201:
 *       description: Returns the created product
 *    parameters:
 *     - name: product
 *       in: body
 *       description: Product to create
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *          name:
 *              type: string
 *              example: Medias de Huracán
 *          descripcion:
 *              type: string
 *              example: Medias blancas titulares de Huracán
 *          categoria:
 *              type: string
 *              example: Medias
 *          precio:
 *              type: number
 *              example: 1000
 *          stock:
 *              type: number
 *              example: 500
 *
 *
 *
 * /api/products/{category}:
 *   get:
 *     summary: Get products by Category
 *     tags:
 *      - Products
 *     responses:
 *      200:
 *        description: Returns an array of Products.
 *     parameters:
 *      - name: category
 *        in: path
 *        description: Category of the product
 *        required: false
 *        schema:
 *          type: string
 *
 * /api/products/{id}:
 *   put:
 *    summary: Update a product
 *    tags:
 *      - Products
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      201:
 *       description: Returns the updated product
 *    parameters:
 *     - name: id
 *       in: path
 *       description: ID of the product to update
 *       required: true
 *     - name: product
 *       in: body
 *       description: Product to update
 *       required: true
 *       schema:
 *         type: string
 *   delete:
 *    summary: Delete a product
 *    tags:
 *      - Products
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      201:
 *       description: Returns the created product
 *    parameters:
 *     - name: id
 *       in: path
 *       description: ID of the product to delete
 *       required: true
 */

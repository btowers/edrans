/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Get orders
 *     tags:
 *      - Orders
 *     responses:
 *      200:
 *        description: Orders returned
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of the order
 *        required: false
 *        schema:
 *          type: string
 *
 * /api/orders/complete:
 *   post:
 *     summary: Change order status to "complete"
 *     tags:
 *      - Orders
 *     responses:
 *      200:
 *        description: Order status changed to "complete"
 *     parameters:
 *      - name: id
 *        in: body
 *        description: ID of the order
 *        required: true
 *        schema:
 *          type: string
 *
 */

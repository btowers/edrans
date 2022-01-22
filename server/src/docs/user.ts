/**
 * @openapi
 * /api/user/login:
 *   post:
 *     tags:
 *      - User
 *     summary: Log in user and return JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *            email:
 *              type: string
 *              example: test@gmail.com
 *            password:
 *              type: string
 *              example: TestUser1!
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Unauthorized User
 *
 * /api/user/signup:
 *   post:
 *     tags:
 *      - User
 *     summary: Sign up user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *            nombre:
 *              type: string
 *              example: Test User 2
 *            email:
 *              type: string
 *              example: test2@gmail.com
 *            password:
 *              type: string
 *              example: TestUser2!
 *              description: Password must be at least 8 characters long and contain at least one number, one uppercase letter and one special character
 *            confirmPassword:
 *              type: string
 *              example: TestUser2!
 *              description: confirmPassword should match password
 *            direccion:
 *              type: object
 *              properties:
 *               calle:
 *                  type: string
 *                  example: Mi Calle
 *               altura:
 *                  type: string
 *                  example: 1000
 *               cp:
 *                  type: string
 *                  example: 1234
 *               piso:
 *                  type: string
 *                  example: 4
 *               departamento:
 *                  type: string
 *                  example: A
 *            identificador:
 *                  type: string
 *                  example: 1122334455
 *     responses:
 *       '200':
 *         description: User Signed Up
 *       '401':
 *         description: Unauthorized User
 */

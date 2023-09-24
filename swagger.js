/**
 * @swagger
 * /v1/user:
 *  get:
 *      description: Get all users
 *      parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Bearer Token
 *         schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Success
 *      tags:
 *          - User
 */
/**
 * @swagger
 * /v1/auth/register:
 *  post:
 *      description: responses
 *      parameters:
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             fullName:
 *               type: string
 *             paymentId:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 *      tags:
 *          - Auth
 */
/**
 * @swagger
 * /v1/auth/login:
 *  post:
 *      description: responses
 *      parameters:
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 *      tags:
 *          - Auth
 */
/**
 * @swagger
 * /v1/user/{id}:
 *   put:
 *     description: Update user information by providing the user's ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *       - in: header
 *         name: token
 *         required: true
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: body
 *         name: user
 *         required: true
 *         description: User data to update.
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *             fullName:
 *               type: string
 *             paymentID:
 *               type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *     tags:
 *          - User
 */
/**
 * @swagger
 * /v1/payment:
 *  post:
 *      description: responses
 *      parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        description: Bearer Token
 *        schema:
 *            type: string
 *      - in: body
 *        name: payment
 *        schema:
 *           type: object
 *           properties:
 *             cardId:
 *               type: string
 *             fullName:
 *               type: string
 *             nameCard:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 *      tags:
 *          - Payment
 */
/**
 * @swagger
 * /v1/payment/{id}:
 *   put:
 *     description: Update Payment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the payment
 *       - in: header
 *         name: token
 *         required: true
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: body
 *         name: payment
 *         required: true
 *         description: Payment data to update.
 *         schema:
 *           type: object
 *           properties:
 *             paymentID:
 *               type: string
 *             fullName:
 *               type: string
 *             nameCard:
 *               type: string
 *     responses:
 *       200:
 *         description: Payment updated successfully.
 *     tags:
 *          - Payment
 */
/**
 * @swagger
 * /v1/post:
 *  post:
 *      description: responses
 *      parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        description: Bearer Token
 *        schema:
 *            type: string
 *      - in: body
 *        name: post
 *        schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             userId:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 *      tags:
 *          - Post
 */
/**
 * @swagger
 * /v1/post/{id}:
 *   put:
 *     description: Update Post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post
 *       - in: header
 *         name: token
 *         required: true
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: body
 *         name: post
 *         required: true
 *         description: Post data to update.
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             userId:
 *               type: string
 *     responses:
 *       200:
 *         description: Post updated successfully.
 *     tags:
 *          - Post
 */
/**
 * @swagger
 * /v1/post/{id}:
 *   delete:
 *     description: Delete Post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post
 *       - in: header
 *         name: token
 *         required: true
 *         description: Bearer Token
 *         schema:
 *            type: string
 *     responses:
 *       200:
 *         description: Post delete successfully.
 *     tags:
 *          - Post
 */
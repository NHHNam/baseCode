/**
 * @swagger
 * /user/register:
 *  post:
 *      description: responses
 *      parameters:
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             password:
 *               type: string
 *             fullName:
 *               type: string
 *             point:
 *               type: number
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /user/login:
 *  post:
 *      description: responses
 *      parameters:
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             password:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /user/profile:
 *  get:
 *      description: responses
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: token for authentication
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /user/profile:
 *  put:
 *      description: responses
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: token for authentication
 *      - in: body
 *        name: admin
 *        schema:
 *           type: object
 *           properties:
 *             fullName:
 *               type: string
 *             point:
 *               type: number
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /user/logout:
 *  delete:
 *      description: responses
 *      parameters:
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /user/payment:
 *  post:
 *      description: responses
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: token for authentication
 *      - in: body
 *        name: user
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
 */

/**
 * @swagger
 * /user/payment:
 *  put:
 *      description: responses
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: token for authentication
 *      - in: body
 *        name: user
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
 */

/**
 * @swagger
 * /admin/post:
 *  post:
 *      description: responses
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: token for authentication
 *      - in: body
 *        name: admin
 *        schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/post:
 *  get:
 *      description: responses
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: token for authentication
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/post:
 *  put:
 *      description: responses
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: token for authentication
 *      - in: body
 *        name: admin
 *        schema:
 *           type: object
 *           properties:
 *             postId:
 *               type: string
 *             title:
 *               type: string
 *             description:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/post:
 *  delete:
 *      description: responses
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: token for authentication
 *      - in: body
 *        name: admin
 *        schema:
 *           type: object
 *           properties:
 *             postId:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

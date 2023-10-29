/**
 * tags:
  - name: user
    description: Everything about your Pets
 */

/**
 * @swagger
 * /user/signIn:
 *  post:
 *      description: responses
 *      tags:
 *      - user
 *      parameters:
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             Username:
 *               type: string
 *             Email:
 *               type: string
 *             Password:
 *               type: string
 *             FullName:
 *               type: string
 *             Point:
 *               type: number
 *             Payment:
 *               type: string
 *             Role:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /user/login:
 *  post:
 *      description: responses
 *      tags:
 *      - user
 *      parameters:
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             UserName:
 *               type: string
 *             Password:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /user/profile:
 *  put:
 *      description: responses
 *      tags:
 *      - user
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: token for authentication
 *      - in: body
 *      responses:
 *          200:
 *              description: success
 */

/**
 * tags:
  - name: user
    description: Everything about your Pets
 */

/**
 * @swagger
 * /user/register:
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
 *             userName:
 *               type: string
 *             email:
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
 *      tags:
 *      - user
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
 *      tags:
 *      - user
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
 *      tags:
 *      - user
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
 *      tags:
 *      - user
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
 *      tags:
 *      - user
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
 *      tags:
 *      - user
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
 *      tags:
 *      - admin
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: token for authentication
 *      - in: formData
 *        name: fileUpload
 *        type: file
 *        description: The file to upload
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
 *      tags:
 *      - admin
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
 *      tags:
 *      - admin
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
 *      tags:
 *      - admin
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

/**
 * @swagger
 * /user/change-password:
 *  patch:
 *      description: responses
 *      tags:
 *      - user private
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: token for authentication
 *      - in: body
 *        required: true
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             oldPassword:
 *               type: string
 *             newPassword:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /user/forgot-password:
 *  post:
 *      description: responses
 *      tags:
 *      - user private
 *      parameters:
 *      - in: body
 *        required: true
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /user/recovery-password:
 *  patch:
 *      description: responses
 *      tags:
 *      - user private
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: otp token for authentication
 *      - in: body
 *        required: true
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             otp:
 *               type: number
 *             newPassword:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/user-list:
 *  get:
 *      description: responses
 *      tags:
 *      - admin
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
 * /admin/lock-user:
 *  patch:
 *      description: responses
 *      tags:
 *      - admin
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: token for authentication
 *      - in: body
 *        required: true
 *        name: admin
 *        schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/refresh-password:
 *  patch:
 *      description: responses
 *      tags:
 *      - admin
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *        description: token for authentication
 *      - in: body
 *        required: true
 *        name: admin
 *        schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

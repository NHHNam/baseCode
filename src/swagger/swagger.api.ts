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
 *             amount:
 *               type: number
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
 *             amount:
 *               type: number
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @openapi
 * /admin/post:
 *  post:
 *      description: responses
 *      tags:
 *      - admin
 *      requestBody:
 *          required: true
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  title:
 *                    type: string
 *                  description:
 *                    type: string
 *                  fileUpload:
 *                    type: file
 *
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
 *      - in: query
 *        name: search
 *        type: string
 *        description: query description or title field, default = null
 *      - in: query
 *        name: page
 *        type: number
 *        description: Page number,  default = 1
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
 *      - in: formData
 *        name: fileUpload
 *        type: file
 *        description: The file to upload
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
 *      - in: query
 *        name: search
 *        type: string
 *        description: query userName, email or fullName field, default = null
 *      - in: query
 *        name: page
 *        type: number
 *        description: Page number,  default = 1
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

/**
 * @swagger
 * /user/refresh-token:
 *  post:
 *      description: responses
 *      tags:
 *      - user private
 *      parameters:
 *      - in: body
 *        required: true
 *        name: admin
 *        schema:
 *           type: object
 *           properties:
 *             refreshToken:
 *               type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/payment:
 *  get:
 *      description: responses
 *      tags:
 *      - admin
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: query
 *        name: search
 *        type: string
 *        description: query fullName, cardId or nameCard field, default = null
 *      - in: query
 *        name: page
 *        type: number
 *        description: Page number,  default = 1
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/payment:
 *  post:
 *      description: responses
 *      tags:
 *      - admin
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        description: Nếu không có trường userId thì sẽ add payment cho chính admin đang sử dụng API
 *        required: true
 *        name: admin
 *        schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *             cardId:
 *               type: string
 *             fullName:
 *               type: string
 *             nameCard:
 *               type: string
 *             amount:
 *               type: number
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/payment:
 *  put:
 *      description: responses
 *      tags:
 *      - admin
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        description: Nếu không có trường userId thì sẽ update payment cho chính admin đang sử dụng API
 *        required: true
 *        name: admin
 *        schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *             cardId:
 *               type: string
 *             fullName:
 *               type: string
 *             nameCard:
 *               type: string
 *             amount:
 *               type: number
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /user/atm-transaction:
 *  post:
 *      description: responses
 *      tags:
 *      - transaction
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        required: true
 *      - in: body
 *        name: user
 *        required: true
 *        schema:
 *           type: object
 *           properties:
 *             toUserId:
 *               type: string
 *             amount:
 *               type: number
 *      responses:
 *          200:
 *              description: success
 */
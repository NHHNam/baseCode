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
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  userName:
 *                    type: string
 *                  email:
 *                    type: string
 *                  password:
 *                     type: string
 *                  fullName:
 *                     type: string
 *                  point:
 *                     type: number
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
 *      requestBody:
 *          required: true
 *          name: user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  userName:
 *                    type: string
 *                  password:
 *                    type: string
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
 *      requestBody:
 *          required: true
 *          name: user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  fullName:
 *                    type: string
 *                  point:
 *                    type: number
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
 *      requestBody:
 *          required: true
 *          name: user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  cardId:
 *                    type: string
 *                  fullName:
 *                    type: string
 *                  nameCard:
 *                    type: string
 *                  amount:
 *                    type: number
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
 *      requestBody:
 *          required: true
 *          name: user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  cardId:
 *                    type: string
 *                  fullName:
 *                    type: string
 *                  nameCard:
 *                    type: string
 *                  amount:
 *                    type: number
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
 * @openapi
 * /admin/elastic-search/user:
 *  get:
 *      description: responses
 *      tags:
 *      - admin
 *      parameters:
 *      - in: query
 *        name: query
 *        require: true
 *        type: string
 *        description: query description or title field, default = null
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
 *      requestBody:
 *          name: admin
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  postId:
 *                    type: string
 *                  title:
 *                    type: string
 *                  description:
 *                    type: string
 *                  fileUpload:
 *                    type: file
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
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  postId:
 *                    type: string
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
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  oldPassword:
 *                    type: string
 *                  newPassword:
 *                    type: string
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
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
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
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  otp:
 *                    type: number
 *                  newPassword:
 *                    type: string
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
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  userId:
 *                  type: string
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
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  userId:
 *                    type: string
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
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  refreshToken:
 *                    type: string
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
 *      requestBody:
 *          description: Nếu không có trường userId thì sẽ add payment cho chính admin đang sử dụng API
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  userId:
 *                    type: string
 *                  cardId:
 *                    type: string
 *                  fullName:
 *                    type: string
 *                  nameCard:
 *                    type: string
 *                  amount:
 *                    type: number
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
 *      requestBody:
 *          description: Nếu không có trường userId thì sẽ update payment cho chính admin đang sử dụng API
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  userId:
 *                    type: string
 *                  cardId:
 *                    type: string
 *                  fullName:
 *                    type: string
 *                  nameCard:
 *                    type: string
 *                  amount:
 *                    type: number
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
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  toUserId:
 *                    type: string
 *                  amount:
 *                    type: number
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /search/{index}:
 *   get:
 *     tags:
 *     - elastic search
 *     parameters:
 *       - in: path
 *         name: index
 *         schema:
 *           type: string
 *         required: true
 *         description: Chỉ mục cần tìm kiếm
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Tên cần tìm kiếm
 *     responses:
 *       '200':
 *         description: Kết quả tìm kiếm thành công
 */

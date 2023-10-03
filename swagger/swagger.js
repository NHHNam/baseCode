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
 * /v1/user/getUser:
 *  get:
 *      description: Get users
 *      parameters:
 *       - in: header
 *         name: token
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: query
 *         name: page
 *         description: Page number
 *         schema:
 *            type: integer 
 *      responses:
 *          200:
 *              description: Success
 *      tags:
 *          - User
 */
/**
 * @swagger
 * /v1/user/SearchByUsername/{username}:
 *  get:
 *      description: Search User by Username
 *      parameters:
 *       - in: header
 *         name: token
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: path
 *         name: username
 *         description: Username
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
 * /v1/user/SearchByFullName/{fullName}:
 *  get:
 *      description: Search User by fullName
 *      parameters:
 *       - in: header
 *         name: token
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: path
 *         name: fullName
 *         description: fullName
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
 * /v1/user/SearchByPoint/{point}:
 *  get:
 *      description: Search User by Point
 *      parameters:
 *       - in: header
 *         name: token
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: path
 *         name: point
 *         description: Point
 *         schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Success
 *      tags:
 *          - User
 */
/**
 * @swagger
 * /v1/user/SearchByRole/{role}:
 *  get:
 *      description: Search User by Role
 *      parameters:
 *       - in: header
 *         name: token
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: path
 *         name: role
 *         description: Role
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
 * /v1/user/SearchByEmail/{email}:
 *  get:
 *      description: Search User by Email
 *      parameters:
 *       - in: header
 *         name: token
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: path
 *         name: email
 *         description: Email
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
 * /v1/user/updateUser/{id}:
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
 * /v1/user/updateRole/{id}:
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
 *         description: Update Role.
 *         schema:
 *           type: object
 *           properties:
 *             role:
 *               type: string
 *     responses:
 *       200:
 *         description: Updated successfully.
 *     tags:
 *          - User
 */
/**
 * @swagger
 * /v1/user/lockUser/{id}:
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
 *         description: Update Role.
 *         schema:
 *           type: object
 *           properties:
 *             lock:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Locked successfully.
 *     tags:
 *          - User
 */
/**
 * @swagger
 * /v1/user/changePassword/{id}:
 *   put:
 *     description: Change password
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to change password.
 *       - in: header
 *         name: token
 *         required: true
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: body
 *         name: user
 *         required: true
 *         description: Change password.
 *         schema:
 *           type: object
 *           properties:
 *             newPassword:
 *               type: string
 *             oldPassword:
 *               type: string
 *     responses:
 *       200:
 *         description: Change password successfully.
 *     tags:
 *          - User
 */
/**
 * @swagger
 * /v1/user/refreshPassword/{id}:
 *   post:
 *     description: Change password
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to refreshs password.
 *       - in: header
 *         name: token
 *         required: true
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: body
 *         name: user
 *         required: true
 *         description: Refresh password.
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: Refresh password.
 *     tags:
 *          - User
 */
/**
 * @swagger
 * /v1/user/forgotPassword/{id}:
 *   post:
 *     description: Send OTP
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to forgot password.
 *       - in: body
 *         name: user
 *         required: true
 *         description: Forgot password.
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: Send OTP succesfull.
 *     tags:
 *          - User
 */
/**
 * @swagger
 * /v1/user/verifyOTPAndUpdatePassword/{id}:
 *   post:
 *     description: Verify OTP and password
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to verify.
 *       - in: body
 *         name: user
 *         required: true
 *         description: Verify OTP and password
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             otp:
 *               type: string
 *     responses:
 *       200:
 *         description: Verify succesfully.
 *     tags:
 *          - User
 */
/**
 * @swagger
 * /v1/payment/getPayment:
 *  get:
 *      description: Get payment
 *      parameters:
 *       - in: header
 *         name: token
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: query
 *         name: page
 *         description: Page number
 *         schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Success
 *      tags:
 *          - Payment
 */
/**
 * @swagger
 * /v1/payment/SearchByCardId/{cardId}:
 *  get:
 *      description: Search Payment by cardId
 *      parameters:
 *       - in: header
 *         name: token
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: path
 *         name: cardId
 *         description: CardID
 *         schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Success
 *      tags:
 *          - Payment
 */
/**
 * @swagger
 * /v1/payment/SearchByFullName/{fullName}:
 *  get:
 *      description: Search Payment by fullName
 *      parameters:
 *       - in: header
 *         name: token
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: path
 *         name: fullName
 *         description: fullName
 *         schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Success
 *      tags:
 *          - Payment
 */
/**
 * @swagger
 * /v1/payment/SearchByNameCard/{nameCard}:
 *  get:
 *      description: Search Payment by nameCard
 *      parameters:
 *       - in: header
 *         name: token
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: path
 *         name: nameCard
 *         description: nameCard
 *         schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Success
 *      tags:
 *          - Payment
 */
/**
 * @swagger
 * /v1/payment/addpayment:
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
 * /v1/payment/updatePayment/{id}:
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
 * /v1/payment/deletePayment/{id}:
 *   delete:
 *     description: Delete Payment
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
 *     responses:
 *       200:
 *         description: Payment delete successfully.
 *     tags:
 *          - Payment
 */
/**
 * @swagger
 * /v1/post/getPost:
 *  get:
 *      description: Get post
 *      parameters:
 *       - in: header
 *         name: token
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: query
 *         name: page
 *         description: Page number
 *         schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Success
 *      tags:
 *          - Post
 */
/**
 * @swagger
 * /v1/post/SearchByTitle/{title}:
 *  get:
 *      description: Search Post by Title
 *      parameters:
 *       - in: header
 *         name: token
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: path
 *         name: title
 *         description: Title
 *         schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Success
 *      tags:
 *          - Post
 */
/**
 * @swagger
 * /v1/post/SearchByDescription/{description}:
 *  get:
 *      description: Search Post by description
 *      parameters:
 *       - in: header
 *         name: token
 *         description: Bearer Token
 *         schema:
 *            type: string
 *       - in: path
 *         name: description
 *         description: description
 *         schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Success
 *      tags:
 *          - Post
 */
/**
 * @swagger
 * /v1/post/addPost:
 *  post:
 *      description: Add Post
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
 * /v1/post/updatePost/{id}:
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
 * /v1/post/deletePost/{id}:
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
/**
 * @swagger
 * /v1/post/addThumnail/{id}:
 *   post:
 *     description: Add Thumnail
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post
 *       - in: header
 *         name: token
 *         required: true
 *         description: Bearer Token
 *       - in: formData
 *         name: img
 *         type: file
 *         required: true
 *         description: The image file to upload
 *     responses:
 *       200:
 *         description: Add thumnail successfully.
 *     tags:
 *          - Post
 */
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
 * /v1/payment/{id}:
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
import express from "express";
import UserController from "../controllers/user.controller";
import { checkToken } from "../middle/checkToken";
const userRouter = express.Router();

/**
 * @openapi
 * tags:
 *   name: User
 *   description: Operations related to users
 */

/**
 * @openapi
 * /users/:
 *   get:
 *     description: Retrieve a list of users.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns a list of users.
 */
userRouter.get("/", UserController.getUser);

/**
 * @openapi
 * /users:
 *   post:
 *     description: Create a new user.
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 */
userRouter.post("/", checkToken, UserController.createUser);

/**
 * @openapi
 * /users/{userId}/{productId}:
 *   put:
 *     description: Update a user by ID.
 *     tags: [User]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user to update.
 *         required: true
 *         schema:
 *           type: integer
 *       - name: productId
 *         in: path
 *         description: The ID of the product to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */
userRouter.put("/:userId/:productId", UserController.updateUser);

export default userRouter;

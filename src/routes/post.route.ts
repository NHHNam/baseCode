import express from "express";
import UserController from "../controllers/user.controller";
const postRouter = express.Router();

/**
 * @openapi
 * tags:
 *   name: Post
 *   description: Operations related to Posts
 */

/**
 * @openapi
 * /posts/:
 *   get:
 *     description: Retrieve a list of Post.
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Returns a list of Post.
 */
postRouter.get("/", UserController.getUser);

/**
 * @openapi
 * /posts:
 *   post:
 *     description: Create a new posts.
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 */
postRouter.post("/", UserController.createUser);

/**
 * @openapi
 * /posts/{userId}/{productId}:
 *   put:
 *     description: Update a post by ID.
 *     tags: [Post]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the post to update.
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */
postRouter.put("/:userId/:productId", UserController.updateUser);

export default postRouter;

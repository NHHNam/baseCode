import express from "express";
import { API_V1_POST } from "../constant/path/v1";
import { PostController } from "../controllers";
import { checkAuthIsAdmin } from "../middleware/auth.middleware";
const router = express.Router();

router
  .route(`${API_V1_POST.feature.getPost}/:postId`)
  .get(PostController.getPost);
router.route(API_V1_POST.feature.getAllPosts).get(PostController.getAllPosts);
router.route(API_V1_POST.feature.searchPosts).get(PostController.searchPosts);
router
  .route(`${API_V1_POST.feature.updatePost}/:postId`)
  .patch(PostController.updatePost);

router.use(checkAuthIsAdmin);
router.route(API_V1_POST.feature.createPost).post(PostController.createPost);
router
  .route(`${API_V1_POST.feature.deletePost}/:postId`)
  .delete(PostController.deletePost);

export default router;

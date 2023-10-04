import express from "express";
import { AdminController } from "../controllers";
import { API_V1_ADMIN } from "../constant/path/v1";
import {
  authentication,
  checkAuthIsAdmin,
} from "../middleware/auth.middleware";
const router = express.Router();

router.use(checkAuthIsAdmin);
// router.use(authentication);
router
  .route(`${API_V1_ADMIN.feature.getUser}/:userId`)
  .get(AdminController.getUser);
router.route(API_V1_ADMIN.feature.getAllUsers).get(AdminController.geAllUsers);
router.route(API_V1_ADMIN.feature.updateUser).patch(AdminController.updateUser);
router.route(API_V1_ADMIN.feature.blockUser).patch(AdminController.blockUser);
router
  .route(API_V1_ADMIN.feature.deleteUser)
  .delete(AdminController.deleteUser);

export default router;
// module.exports = router;

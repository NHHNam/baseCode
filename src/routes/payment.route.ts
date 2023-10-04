import express from "express";
import { API_V1_PAYMENT } from "../constant/path/v1";
import { PaymentController } from "../controllers";
import { authentication, checkAuthIsAdmin } from "../middleware/auth.middleware";
const router = express.Router();

router.use(authentication);
router
  .route(API_V1_PAYMENT.feature.createPayment)
  .post(PaymentController.createPayment);
router
  .route(`${API_V1_PAYMENT.feature.getPayment}/:paymentId`)
  .get(PaymentController.getPayment);
router.use(checkAuthIsAdmin);
router
  .route(API_V1_PAYMENT.feature.getAllPayments)
  .get(PaymentController.getAllPayments);
router
  .route(API_V1_PAYMENT.feature.searchPosts)
  .get(PaymentController.searchPosts);
router
  .route(`${API_V1_PAYMENT.feature.updatePayment}/:paymentId`)
  .patch(PaymentController.updatePayment);
router
  .route(`${API_V1_PAYMENT.feature.deletePayment}/:paymentId`)
  .delete(PaymentController.deletePayment);
export default router;

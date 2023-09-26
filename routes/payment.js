const middlewareController = require("../controller/middlewareController");
const paymentController = require("../controller/paymentController");
const router = require("express").Router();

//Route add payment
router.post("/", middlewareController.verifyToken, paymentController.addPayment);

//Route update payment
router.put("/:id", middlewareController.verifyToken, paymentController.upadtePayment);

//Route delete payment
router.delete(":/id", middlewareController.verifyTokenAnAdminAuth, paymentController.deletePayment);
module.exports = router;
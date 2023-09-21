const middlewareController = require("../controller/middlewareController");
const paymentController = require("../controller/paymentController");
const router = require("express").Router();

//Route add payment
router.post("/", middlewareController.verifyToken, paymentController.addPayment);

//Route update payment
router.put("/:id", middlewareController.verifyToken, paymentController.upadtePayment);
module.exports = router;
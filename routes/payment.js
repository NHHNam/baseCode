const middlewareController = require("../controller/middlewareController");
const paymentController = require("../controller/paymentController");
const router = require("express").Router();

router.post("/", middlewareController.verifyToken, paymentController.addPayment);
router.put("/:id", middlewareController.verifyToken, paymentController.upadtePayment);
module.exports = router;
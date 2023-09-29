const middlewareController = require("../controller/middlewareController");
const paymentController = require("../controller/paymentController");
const router = require("express").Router();

//Route add payment
router.post("/", (req, res, next) => {
    if (middlewareController.verifyTokenAnAdminAuth) {
        paymentController.addPayment(req, res);
    } else {
        paymentController.addPaymentForUser(req, res);
    }
});

//Route update payment
router.put("/:id", (req, res, next) => {
    if (middlewareController.verifyTokenAnUserAuth) {
        paymentController.upadtePayment(req, res);
    } else {
        paymentController.upadtePayment(req, res);
    }
});

//Route delete payment
router.delete("/:id", middlewareController.verifyTokenAnAdminAuth, paymentController.deletePayment);
module.exports = router;
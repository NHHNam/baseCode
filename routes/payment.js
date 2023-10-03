const middlewareController = require("../controller/middlewareController");
const paymentController = require("../controller/paymentController");
const router = require("express").Router();

//Route get payment
router.get("/getPayment", (req, res) => {
    const page = req.query.page;
    if (page) {
        paymentController.getPaymentByPage(req, res, parseInt(page) || 1);
    } else {
        paymentController.getAllPayment(req, res);
    }
});

//Route add payment
router.post("/addPayment", (req, res, next) => {
    if (middlewareController.verifyTokenAnAdminAuth) {
        paymentController.addPayment(req, res);
    } else {
        paymentController.addPaymentForUser(req, res);
    }
});

//Route update payment
router.put("/updatePayment/:id", (req, res, next) => {
    if (middlewareController.verifyTokenAnUserAuth) {
        paymentController.upadtePayment(req, res);
    } else {
        paymentController.upadtePayment(req, res);
    }
});

//Route delete payment
router.delete("/deletePayment/:id", middlewareController.verifyTokenAnAdminAuth, paymentController.deletePayment);

//Route search cardID
router.get("/SearchByCardId/:cardId", paymentController.searchByCardID);

//Route search fullName
router.get("/SearchByFullName/:fullName", paymentController.searchByFullname);

//Route search nameCard
router.get("/SearchByNameCard/:nameCard", paymentController.searchByNameCard);
module.exports = router;
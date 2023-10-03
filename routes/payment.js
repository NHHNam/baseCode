const middlewareController = require("../controller/middlewareController");
const paymentController = require("../controller/paymentController");
const router = require("express").Router();

//Route get payment
router.get("/getPayment", (req, res) => {
    if (middlewareController.verifyTokenAnAdminAuth) {
        const page = req.query.page;
        if (page) {
            paymentController.getPaymentByPage(req, res, parseInt(page) || 1);
        } else {
            paymentController.getAllPayment(req, res);
        }
    } else {
        res.status(403).json({ error: "Access denied" });
    }

});

//Route add payment
router.post("/addPayment", (req, res, next) => {
    if (middlewareController.verifyTokenAnAdminAuth || middlewareController.verifyTokenAnUserAuth) {
        paymentController.addPayment(req, res);
    } else {
        res.status(403).json({ error: "Access denied" });
    }
});

//Route update payment
router.put("/updatePayment/:id", (req, res, next) => {
    if (middlewareController.verifyTokenAnUserAuth || middlewareController.verifyTokenAnAdminAuth) {
        paymentController.upadtePayment(req, res);
    } else {
        res.status(403).json({ error: "Access denied" });
    }
});

//Route delete payment
router.delete("/deletePayment/:id", middlewareController.verifyTokenAnAdminAuth, paymentController.deletePayment);

//Route search cardID
router.get("/SearchByCardId/:cardId", middlewareController.verifyTokenAnAdminAuth, paymentController.searchByCardID);

//Route search fullName
router.get("/SearchByFullName/:fullName", middlewareController.verifyTokenAnAdminAuth, paymentController.searchByFullname);

//Route search nameCard
router.get("/SearchByNameCard/:nameCard", middlewareController.verifyTokenAnAdminAuth, paymentController.searchByNameCard);
module.exports = router;
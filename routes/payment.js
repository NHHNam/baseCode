const middlewareController = require("../controller/middlewareController");
const paymentController = require("../controller/paymentController");
const router = require("express").Router();

//Route get payment
router.get("/getPayment", (req, res) => {
    // Gọi middleware verifyTokenAnAuth để kiểm tra quyền truy cập
    middlewareController.verifyTokenAnAuth(req, res, () => {
        const page = req.query.page;
        //Neu nhap so trang thi hien thi noi dung cua trang do
        if (page) {
            paymentController.getPaymentByPage(req, res, parseInt(page) || 1);
        }
        //khong nhap thi hien thi tat ca Payment
        else {
            paymentController.getAllPayment(req, res);
        }
    }, () => {
        // Middleware không cho phép truy cập
        res.status(403).json({ error: "Access denied" });
    });
});

//Route add payment
router.post("/addPayment", middlewareController.verifyTokenAnAuth, paymentController.addPayment);

//Route update payment
router.put("/updatePayment/:id", middlewareController.verifyTokenAnAuth, paymentController.upadtePayment);

//Route delete payment
router.delete("/deletePayment/:id", middlewareController.verifyTokenAnAuth, paymentController.deletePayment);

//Route search cardID
router.get("/SearchByCardId/:cardId", middlewareController.verifyTokenAnAuth, paymentController.searchByCardID);

//Route search fullName
router.get("/SearchByFullName/:fullName", middlewareController.verifyTokenAnAuth, paymentController.searchByFullname);

//Route search nameCard
router.get("/SearchByNameCard/:nameCard", middlewareController.verifyTokenAnAuth, paymentController.searchByNameCard);
module.exports = router;
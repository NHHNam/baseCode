const userservice = require("./UserService");
const router = require("express").Router();

router.get('/:user/:type/:id', userservice.getUserByID);
router.get('/user', userservice.getAllUser);
router.put('/user/:id', userservice.updateUser);
router.delete('/user/:id', userservice.deleteUser);
router.post('/user', userservice.addUser);

router.get('/:post/:type/:id', userservice.getPostByID);
router.get('/post', userservice.getAllPost);
router.put('/post/:id', userservice.updatePost);
router.delete('/post/:id', userservice.deletePost);
router.post('/post', userservice.addPost);

router.get('/:payment/:type/:id', userservice.getPaymentByID);
router.get('/payment', userservice.getAllPayment);
router.put('/payment/:id', userservice.updatePayment);
router.delete('/payment/:id', userservice.deletePayment);
router.post('/payment', userservice.addPayment);
module.exports = router;
const express = require('express');
const router = express.Router();
const { getProduct, PostProduct, GetByProduct } = require("../controllers/ProductController");
const { Login, Register, UserMe } = require("../controllers/UserController");
const  authMiddleware  = require("../middleware/AuthMiddleware");
const multer = require('multer');
const {PostCart, GetCart, increaseQuantity, decreaseQuantity, DeleteCart} = require("../controllers/CartController");
const {GetOrder} = require("../controllers/OrderController");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb)=> {
        cb(null, file.originalname);
    }
});
const upload = multer({storage})

// api product controller
router.get('/product', authMiddleware, getProduct);
router.post("/addproduct", upload.single("image"), PostProduct );
router.get('/product/:slug',authMiddleware, GetByProduct );
// endpoint cart controller
router.get('/cart', authMiddleware, GetCart)
router.post('/AddCart', authMiddleware, PostCart)
router.delete('/cart/delete',authMiddleware, DeleteCart)
router.post('/cart/plus', authMiddleware, increaseQuantity)
router.post('/cart/minus', authMiddleware, decreaseQuantity)
// endpoint order controller
router.post('/order', authMiddleware, GetOrder);
// api user controller
router.post('/login', Login)
router.post('/register',Register)
router.get('/me', authMiddleware, UserMe)

module.exports = router;
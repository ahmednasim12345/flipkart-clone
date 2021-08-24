const express = require('express');
const { userMiddleWare, requiredSignin } = require('../Common-middleWare');
const { addToCart,getCartItems } = require('../controller/cart.controller');
const router = express.Router();

router.post("/user/cart/addtocart",requiredSignin, userMiddleWare,addToCart);

router.post('/user/getCartItems',requiredSignin,userMiddleWare,getCartItems);




module.exports = router;
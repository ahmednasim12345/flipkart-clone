const express = require('express');
const { userMiddleWare, requiredSignin, adminMiddleWare } = require('../Common-middleWare');
const {  addOrder ,getOrders} = require('../controller/order.controller');
const { updateOrder } = require('../controller/Admin/order.admin');

const router = express.Router();

router.post("/user/order/addOrder",requiredSignin, userMiddleWare,addOrder);

router.get('/user/order/getOrders',requiredSignin,userMiddleWare,getOrders);
router.post(`/order/update`,requiredSignin,adminMiddleWare, updateOrder);



module.exports = router;
const express = require('express');
const { userMiddleWare, requiredSignin } = require('../../Common-middleWare');
 const { addAddress ,getAddress} = require('../../controller/Admin/address.controller');
const router = express.Router();

router.post('/user/address/create',requiredSignin, userMiddleWare,addAddress);

 router.post('/user/getAddress', requiredSignin,userMiddleWare,getAddress);




module.exports = router;
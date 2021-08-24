const express = require('express');



const { userSignUp, userSignin} = require('../controller/user.controller');
const { validateRequest } = require('../Validators/userValidator');

const router = express.Router();

router.post('/user/signup', userSignUp);
router.post('/user/signin',userSignin);

// // middle-ware
// router.post('/user/profile', requiredSignin, (req,res) =>{
//     res.send("user Profile") 
// })


module.exports = router;
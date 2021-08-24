const express = require('express');
const { check } = require('express-validator');



const { adminSignUp, adminSignin,signout} = require('../../controller/Admin/admin.controller');
const { validateRequest, isRequestValidates } = require('../../Validators/userValidator');

const router = express.Router();

router.post('/admin/signup',adminSignUp);
router.post('/admin/signin',adminSignin);
router.post('/admin/signout', signout)




module.exports = router;
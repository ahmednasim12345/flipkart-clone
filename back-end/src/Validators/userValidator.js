const { check, validationResult } = require('express-validator')
exports.validateRequest = [
    check('firstName')
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage('firstName must be at least 5 chars long'),
    check('lastName')
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage('lastName must be at least 5 chars long'),

    check('password')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('password must be at least 6chars long'),
    check('email')
        .notEmpty()
        .isEmail()
        .withMessage('Valid email is required'),
]

exports.isRequestValidates = (req,res,next) =>{
    const errors = validationResult(req);
    if(errors.length > 0){
        res.status(400).json({
        error: errors.array()[0].msg
        })
    }
    next();
}
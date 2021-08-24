
 const bcrypt = require('bcrypt');
 const shortid = require('shortid');
 const jwt = require('jsonwebtoken')
const User = require('../../modals/user');
const { validationResult } = require('express-validator');
exports.adminSignUp = (req, res) => {

  

    // console.log(" ++++++++-==>",req.body)
    User.findOne({ email: req.body.email }).exec( async(error, user) => {
    if (user)
      return res.status(400).json({
        error: "User already registered",
      });

    const { firstName, lastName, email, password } = req.body;
   const hash_password = await bcrypt.hash(password,10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
      role: "admin",
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (data) {
        return res.status(201).json({
          message: "Admin has been successfully created ",
          user: data,
        });
      }
    });
  });
};

exports.adminSignin = (req,res) => {
    User.findOne({ email: req.body.email }).exec( async (error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            const isPassword = await user.authenticate(req.body.password);
          console.log("isPassword",isPassword);
          if (isPassword && user.role === "admin") {
            const token = jwt.sign(
              { _id: user._id, role: user.role },
              process.env.SECRET_KEY,
              { expiresIn: "1d" }
            );
            const { firstName, lastName, email, role, fullName } = user;
    
            res.status(200).json({
                message: "Admin Login SuccesssFully",
              token,
              user: {
                firstName,
                lastName,
                email,
                role,
                fullName,
              },
            });
          } else {
            return res.status(400).json({
              message: "Invalid Email or Password",
            });
          }
        } else {
          res.status(400).json({
            message: "Account not register",
          });
        }
      });
}



exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
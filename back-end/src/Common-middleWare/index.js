const jwt = require("jsonwebtoken")

// Required Signin
exports.requiredSignin = (req, res, next) => {
  if (req.headers.authorization) {
    //    pass token into headers
    const token = req.headers.authorization.split(" ")[1];
    //   decode the token
    const user = jwt.verify(token, process.env.SECRET_KEY);
    console.log("user", user)

    if (user) {
      req.user = user;
      next();
    }
    else {
      res.status(400).json({
        message: "Token expired!"
      })
    }
  } else {
    res.status(400).json({
      message: "Authorization is required"
    })
  }
}

// UserMiddleWare

exports.userMiddleWare = (req, res, next) => {
  console.log("role", req.body.role)
  if (req.user.role !== "user") {
    res.status(400).json({
      message: "User Access is Denied"
    })
  }
  next();
}

exports.adminMiddleWare = (req, res, next) => {
  console.log("role", req.user.role);
  if (req.user.role !== "admin") {
    res.status(400).json({
      message: "Admin Access is Denied"
    })
  }
  next();
}



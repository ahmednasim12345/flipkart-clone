const express = require('express');
const { requiredSignin, adminMiddleWare } = require('../Common-middleWare');
const { addProduct, getProductBySlug ,getProductDetailsById} = require('../controller/product.controller');

const router = express.Router();

const multer  = require('multer')
const path = require('path');
const shortid = require('shortid');

// UPLOADING 



//  we have store the picture into store and define the path
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      // set up the path
    cb(null,path.join(path.dirname(__dirname),'uploads') )
  },
  filename: function (req, file, cb) {
      // sortid name
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})
 
const upload = multer({ storage: storage })

//   upload.single for single product
// upload.array for multiple images




router.post('/product/create',requiredSignin, adminMiddleWare,upload.array('productPictures'),addProduct);
// router.post('/user/signup', userSignUp);

router.get('/products/:slug', getProductBySlug);
router.get('/product/:productId',getProductDetailsById);



module.exports = router;
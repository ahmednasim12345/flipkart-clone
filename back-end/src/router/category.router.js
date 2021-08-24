const express = require('express');
const { requiredSignin, adminMiddleWare } = require('../Common-middleWare');
const { addCategory, getCategory, updateCategories, deleteCategories } = require('../controller/category.controller');
const router = express.Router();
const multer  = require('multer')
const path = require('path');
const shortid = require('shortid');

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



 router.post('/category/addCategory',requiredSignin, adminMiddleWare, upload.single('categoryImage') ,addCategory);
 router.get('/category/get-category',getCategory);
router.post('/category/update',  upload.array('categoryImage'),updateCategories);

router.post('/category/delete',deleteCategories);

module.exports = router;
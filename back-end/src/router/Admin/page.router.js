const express = require('express');
const { createPage, getPage } = require('../../controller/Admin/page.controller');
const router = express.Router();
const multer  = require('multer')
const path = require('path');
const shortid = require('shortid');
const { requiredSignin, adminMiddleWare } = require('../../Common-middleWare');

// UPLOADING 



//  we have store the picture into store and define the path
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      // set up the path
    cb(null,path.join(path.dirname(__dirname),'../uploads') )
  },
  filename: function (req, file, cb) {
      // sortid name
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})
 
const upload = multer({ storage: storage })

//   upload.single for single product
// upload.array for multiple images



router.post('/page/create', upload.fields([
    {name:'banners'},
    {name:'products'}
]),requiredSignin,adminMiddleWare,createPage);

router.get(`/page/:category/:type`,getPage);


module.exports = router;
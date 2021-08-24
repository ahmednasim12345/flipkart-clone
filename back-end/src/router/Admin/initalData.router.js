const express = require('express');
const { intialData } = require('../../controller/Admin/initialData.controller');
const router = express.Router();

router.post('/initialdata',intialData);

module.exports = router;
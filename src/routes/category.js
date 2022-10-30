const express = require('express');
const router = express.Router();
const { allCategory, createCategory } = require('./../controllers/category');

//regiter
router.get('/category', allCategory);
//login
router.post('/category', createCategory);

module.exports = router;
const express = require('express');
const router = express.Router();
const {regiterPerson, loginPerson} = require('./../controllers/person');

//regiter
router.post('/register', regiterPerson);
//login
router.post('/login', loginPerson);

module.exports = router;
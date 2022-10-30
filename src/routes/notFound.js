const express = require('express');
const route = express.Router();
//Not Found
route.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

module.exports = route;
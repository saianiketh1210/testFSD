const express = require('express');
const router = express.Router();
const product = require('./product');
const user = require('./user')

router.use('/product', product.router);
router.use('/user', user.router);

module.exports = { router };
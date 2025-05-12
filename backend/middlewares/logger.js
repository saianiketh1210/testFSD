const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
	console.log(`${req.method} - ${req.path}: ${req.ip}`)
	next()
})

module.exports = { router };
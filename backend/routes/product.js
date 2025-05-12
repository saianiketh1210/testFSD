const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.post('/addproduct', async (req, res) => {
	try {
		console.log(req.body);
		const { name, price, description } = req.body;

		const newProduct = new Product({ name, price, description });
		newProduct.save();

		res.status(200).json({ message: "Product Has Been Succesfully added" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Something went wrong" });
	}
})

router.post('/getAllProducts', async (req, res) => {
	try {
		const allProducts = await Product.find({});
		res.status(200).json({ products: allProducts });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Something went wrong" });
	}
})

module.exports = { router };
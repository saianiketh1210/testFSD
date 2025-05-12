const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
	name: { type: String, required: true, index: true, trim: true },
	price: { type: Number, required: true },
	description: { type: String, required: true, trim: true },
});

module.exports = mongoose.model('Product', productSchema);
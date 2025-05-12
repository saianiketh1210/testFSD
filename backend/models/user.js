const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
	username: { type: String, required: true, index: true, trim: true, unique: true },
	password: { type: String, required: true, trim: true },
	role: { type: String, required: true, enum: ["admin", "user"] }
}, {
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);
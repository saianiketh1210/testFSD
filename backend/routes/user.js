const express = require("express");
const router = express.Router();

const User = require('../models/user');
const { verifyToken, authorizeRoles } = require('../middlewares/authentication');


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
	res.json({ message: "welcome admin" });
})

router.get("/user", authorizeRoles("admin", "user"), (req, res) => {
	res.json({ message: "Welcome user" });
})

router.post('/register', async (req, res) => {
	try {
		const { username, password, role } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ username, password: hashedPassword, role });
		await newUser.save();
		res.status(200).json({ message: `user registered with username:${username}` })
	} catch (err) {
		res.status(500).json({ message: `Something went wrong` })

	}
})

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });

		if (!user) {
			return res.status(404).json({ message: `User with username: ${username} not found` });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		const token = jwt.sign(
			{ id: user._id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		res.status(200).json({ token });
	} catch (err) {
		res.status(500).json({ message: `Something went wrong` })

	}

})

module.exports = { router };
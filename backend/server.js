const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/index');
const logger = require('./middlewares/logger.js');
const cors = require('cors');
app.use(cors());

app.listen(PORT, () => {
	console.log(process.env.MONGO_URI);
	console.log("APP is running on " + PORT);
	mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', logger.router);

app.use('/api', routes.router);

app.get('/hello', (req, res) => {
	res.status(200).send('Hello, I\'m server.js...')
})

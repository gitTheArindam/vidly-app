const mongoose = require("mongoose");
const genres = require("./routes/geners");
const customers = require("./routes/customers");
const express = require("express");
const app = express();

mongoose
	.connect("mongodb://localhost/vidlyDB", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.info("Connected to MongoDB...");
	})
	.catch((error) => {
		console.error("Failed to connect to MongoDB...", error);
	});

app.use(express.json()); // Middleware
app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Listening to port ${port}...`);
});

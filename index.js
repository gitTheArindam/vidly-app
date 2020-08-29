const genres = require("./routes/geners");
const express = require("express");
const app = express();

app.use(express.json()); // Middleware
app.use("/api/genres", genres);

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Listening to port ${port}...`);
});

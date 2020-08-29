const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const genres = ["comedy", "drama", "action"];

// GET method
app.get("/api/genres", (request, response) => {
	response.send(genres);
});

// POST method
app.post("/api/genres", (request, response) => {
	const { error } = validateGenre(request.body);
	if (error) return response.status(400).send(error); // 400 Bad Request

	const newGenre = request.body.name;
	genres.push(newGenre);
	response.send(genres);
});

// PUT method
app.put("/api/genres/:name", (request, response) => {
	const { error } = validateGenre(request.body);
	if (error) return response.status(400).send(error); // 400 Bad Request

	const name = request.params.name;
	const index = genres.indexOf(name);

	if (!index) return response.status(404).send("Genre Not Found!"); //404 Not Found
	genres[index] = request.body.name;
	response.send(genres);
});

// DELETE method
app.delete("/api/genres/:name", (request, response) => {
	const name = request.params.name;
	const index = genres.indexOf(name);

	if (!index) return response.status(404).send("Genre Not Found!"); //404 Not Found
	genres.splice(index, 1);
	response.send(genres);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Listening to port ${port}...`);
});

function validateGenre(genre) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});
	return schema.validate(genre);
}

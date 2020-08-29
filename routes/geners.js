const express = require("express");
const Joi = require("joi");

const router = express.Router();

const genres = ["comedy", "drama", "action"];

// GET method
router.get("/", (request, response) => {
	response.send(genres);
});

// POST method
router.post("/", (request, response) => {
	const { error } = validateGenre(request.body);
	if (error) return response.status(400).send(error); // 400 Bad Request

	const newGenre = request.body.name;
	genres.push(newGenre);
	response.send(genres);
});

// PUT method
router.put("/:name", (request, response) => {
	const { error } = validateGenre(request.body);
	if (error) return response.status(400).send(error); // 400 Bad Request

	const name = request.params.name;
	const index = genres.indexOf(name);

	if (!index) return response.status(404).send("Genre Not Found!"); //404 Not Found
	genres[index] = request.body.name;
	response.send(genres);
});

// DELETE method
router.delete("/:name", (request, response) => {
	const name = request.params.name;
	const index = genres.indexOf(name);

	if (!index) return response.status(404).send("Genre Not Found!"); //404 Not Found
	genres.splice(index, 1);
	response.send(genres);
});

function validateGenre(genre) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});
	return schema.validate(genre);
}

module.exports = router;

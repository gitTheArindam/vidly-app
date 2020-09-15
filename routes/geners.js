const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const router = express.Router();

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 255,
	},
});

const Genre = mongoose.model("Genre", genreSchema);

// GET method
router.get("/", async (request, response) => {
	const genres = await getGenres();
	response.send(genres);
});

// POST method
router.post("/", async (request, response) => {
	const { error } = validateGenre(request.body);
	if (error) return response.status(400).send(error); // 400 Bad Request;

	const genre = await createGenre(request.body.name);

	response.send(genre);
});

// PUT method
router.put("/:id", async (request, response) => {
	const { error } = validateGenre(request.body);
	if (error) return response.status(400).send(error); // 400 Bad Request

	const genre = await updateGenre(request.params.id, request.body.name);
	if (!genre) return response.status(404).send("Genre Not Found!"); //404 Not Found

	response.send(genre);
});

// DELETE method
router.delete("/:id", async (request, response) => {
	const genre = await removeGenre(request.params.id);
	if (!genre) return response.status(404).send("Genre Not Found!"); //404 Not Found

	response.send(genre);
});

async function getGenres() {
	return await Genre.find().select("name").sort("name");
}

async function createGenre(genreName) {
	let result;
	const genre = new Genre({ name: genreName });

	try {
		result = await genre.save();
	} catch (exception) {
		console.error(exception);
		result = null;
	}
	return result;
}

async function updateGenre(genreId, newGenreName) {
	return await Genre.findByIdAndUpdate(
		genreId,
		{
			name: newGenreName,
		},
		{
			new: true,
		}
	);
}

async function removeGenre(genreId) {
	return await Genre.findByIdAndRemove(genreId);
}

function validateGenre(genre) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});
	return schema.validate(genre);
}

module.exports = router;

const { Customer, validate } = require("../models/customer");
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// GET method
router.get("/", async (request, response) => {
	const customers = await getCustomers();
	response.send(customers);
});

// POST method
router.post("/", async (request, response) => {
	const { error } = validate(request.body);
	if (error) return response.status(400).send(error); // 400 Bad Request;

	const customer = await createCustomer(request.body);

	response.send(customer);
});

// PUT method
router.put("/:id", async (request, response) => {
	const { error } = validate(request.body);
	if (error) return response.status(400).send(error); // 400 Bad Request

	const customer = await updateCustomer(request.params.id, request.body);
	if (!customer) return response.status(404).send("Customer Not Found!"); //404 Not Found

	response.send(customer);
});

// DELETE method
router.delete("/:id", async (request, response) => {
	const customer = await removeCustomer(request.params.id);
	if (!customer) return response.status(404).send("Customer Not Found!"); //404 Not Found

	response.send(customer);
});

async function getCustomers() {
	return await Customer.find().select("name isGold phone").sort("name");
}

async function createCustomer(requestBody) {
	let result;
	const customer = new Customer({
		name: requestBody.name,
		isGold: requestBody.isGold,
		phone: requestBody.phone,
	});

	try {
		result = await customer.save();
	} catch (exception) {
		console.error(exception);
		result = null;
	}
	return result;
}

async function updateCustomer(customerId, requestBody) {
	return await Customer.findByIdAndUpdate(
		customerId,
		{
			name: requestBody.name,
			isGold: requestBody.isGold,
			phone: requestBody.phone,
		},
		{
			new: true,
		}
	);
}

async function removeCustomer(customerId) {
	return await Customer.findByIdAndRemove(customerId);
}

module.exports = router;

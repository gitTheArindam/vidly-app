const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 255,
	},
	isGold: {
		type: Boolean,
		default: false,
	},
	phone: {
		type: String,
		required: true,
		maxlength: 10,
	},
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(255).required(),
		isGold: Joi.boolean(),
		phone: Joi.string().max(10).required(),
	});
	return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;

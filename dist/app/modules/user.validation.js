"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const fullNameSchemaWithJoi = joi_1.default.object({
    firstName: joi_1.default.string().required().max(20).trim().messages({
        'any.required': 'First name is required',
        'string.max': 'First name cannot be more than 20 characters',
    }),
    lastName: joi_1.default.string().required().max(20).trim().messages({
        'any.required': 'Last name is required',
        'string.max': 'Last name cannot be more than 20 characters',
    }),
});
const addressSchemaWithJoi = joi_1.default.object({
    street: joi_1.default.string().required().messages({
        'any.required': 'Street is required',
    }),
    city: joi_1.default.string().required().messages({
        'any.required': 'City is required',
    }),
    country: joi_1.default.string().required().messages({
        'any.required': 'Country is required',
    }),
});
const orderSchemaWithJoi = joi_1.default.object({
    productName: joi_1.default.string().required().messages({
        'any.required': 'Product name is required',
    }),
    price: joi_1.default.number().required().messages({
        'any.required': 'Price is required',
        'number.base': 'Price must be a number',
    }),
    quantity: joi_1.default.number().required().messages({
        'any.required': 'Quantity is required',
        'number.base': 'Quantity must be a number',
    }),
});
const userSchemaWithJoi = joi_1.default.object({
    userId: joi_1.default.string().required().messages({
        'any.required': 'User ID is required',
    }),
    username: joi_1.default.string().required().messages({
        'any.required': 'Username is required',
    }),
    password: joi_1.default.string().required().messages({
        'any.required': 'Password is required',
    }),
    fullName: fullNameSchemaWithJoi.required().messages({
        'any.required': 'Full name is required',
    }),
    age: joi_1.default.number().required().messages({
        'any.required': 'Age is required',
        'number.base': 'Age must be a number',
    }),
    email: joi_1.default.string().required().messages({
        'any.required': 'Email is required',
    }),
    address: addressSchemaWithJoi.required().messages({
        'any.required': 'Address is required',
    }),
    orders: joi_1.default.array().items(orderSchemaWithJoi).optional(),
});
exports.default = userSchemaWithJoi;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define Joi schemas for nested objects
const fullnameSchemaWithJoi = joi_1.default.object({
    firstName: joi_1.default.string().trim().max(20).optional().messages({
        'string.base': 'First name must be a string',
        'string.empty': 'First name cannot be empty',
        'string.max': 'First name cannot be more than 20 characters',
        'any.required': 'First name is required',
    }),
    lastName: joi_1.default.string().trim().max(20).optional().messages({
        'string.base': 'Last name must be a string',
        'string.empty': 'Last name cannot be empty',
        'string.max': 'Last name cannot be more than 20 characters',
        'any.required': 'Last name is required',
    }),
});
const addressSchemaWithJoi = joi_1.default.object({
    street: joi_1.default.string().optional().messages({
        'string.base': 'Street must be a string',
        'string.empty': 'Street cannot be empty',
        'any.required': 'Street is required',
    }),
    city: joi_1.default.string().optional().messages({
        'string.base': 'City must be a string',
        'string.empty': 'City cannot be empty',
        'any.required': 'City is required',
    }),
    country: joi_1.default.string().optional().messages({
        'string.base': 'Country must be a string',
        'string.empty': 'Country cannot be empty',
        'any.required': 'Country is required',
    }),
});
// Define Joi schema for the user
const userSchemaWithJoiForUpdate = joi_1.default.object({
    userId: joi_1.default.string().optional().messages({
        'string.base': 'User ID must be a string',
        'string.empty': 'User ID cannot be empty',
        'any.required': 'User ID is required',
    }),
    username: joi_1.default.string().optional().messages({
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
        'any.required': 'Username is required',
    }),
    password: joi_1.default.string().optional().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'any.required': 'Password is required',
    }),
    fullName: fullnameSchemaWithJoi.optional(),
    age: joi_1.default.number().optional().messages({
        'number.base': 'Age must be a number',
        'any.required': 'Age is required',
    }),
    email: joi_1.default.string().optional().email().messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required',
    }),
    isActive: joi_1.default.boolean().default(false).optional(),
    hobbies: joi_1.default.array().items(joi_1.default.string()).optional(),
    address: addressSchemaWithJoi.optional(),
    orders: joi_1.default.array()
        .optional()
        .items(joi_1.default.object({
        productName: joi_1.default.string(),
        price: joi_1.default.number(),
        quantity: joi_1.default.number(),
    })),
});
exports.default = userSchemaWithJoiForUpdate;

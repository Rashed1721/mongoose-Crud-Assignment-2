import Joi from 'joi'

// Define Joi schemas for nested objects
const fullnameSchemaWithJoi = Joi.object({
  firstName: Joi.string().trim().max(20).required().messages({
    'string.base': 'First name must be a string',
    'string.empty': 'First name cannot be empty',
    'string.max': 'First name cannot be more than 20 characters',
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().trim().max(20).required().messages({
    'string.base': 'Last name must be a string',
    'string.empty': 'Last name cannot be empty',
    'string.max': 'Last name cannot be more than 20 characters',
    'any.required': 'Last name is required',
  }),
})

const addressSchemaWithJoi = Joi.object({
  street: Joi.string().required().messages({
    'string.base': 'Street must be a string',
    'string.empty': 'Street cannot be empty',
    'any.required': 'Street is required',
  }),
  city: Joi.string().required().messages({
    'string.base': 'City must be a string',
    'string.empty': 'City cannot be empty',
    'any.required': 'City is required',
  }),
  country: Joi.string().required().messages({
    'string.base': 'Country must be a string',
    'string.empty': 'Country cannot be empty',
    'any.required': 'Country is required',
  }),
})

// Define Joi schema for the user
const userSchemaWithJoi = Joi.object({
  userId: Joi.string().required().messages({
    'string.base': 'User ID must be a string',
    'string.empty': 'User ID cannot be empty',
    'any.required': 'User ID is required',
  }),
  username: Joi.string().required().messages({
    'string.base': 'Username must be a string',
    'string.empty': 'Username cannot be empty',
    'any.required': 'Username is required',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
  }),
  fullName: fullnameSchemaWithJoi.required(),
  age: Joi.number().required().messages({
    'number.base': 'Age must be a number',
    'any.required': 'Age is required',
  }),
  email: Joi.string().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),
  isActive: Joi.boolean().default(false),
  hobbies: Joi.array().items(Joi.string()),
  address: addressSchemaWithJoi.required(),
  orders: Joi.array().items(
    Joi.object({
      productName: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
  ),
})

export default userSchemaWithJoi

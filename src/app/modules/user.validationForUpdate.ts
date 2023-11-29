import Joi from 'joi'

// Define Joi schemas for nested objects
const fullnameSchemaWithJoi = Joi.object({
  firstName: Joi.string().trim().max(20).optional().messages({
    'string.base': 'First name must be a string',
    'string.empty': 'First name cannot be empty',
    'string.max': 'First name cannot be more than 20 characters',
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().trim().max(20).optional().messages({
    'string.base': 'Last name must be a string',
    'string.empty': 'Last name cannot be empty',
    'string.max': 'Last name cannot be more than 20 characters',
    'any.required': 'Last name is required',
  }),
})

const addressSchemaWithJoi = Joi.object({
  street: Joi.string().optional().messages({
    'string.base': 'Street must be a string',
    'string.empty': 'Street cannot be empty',
    'any.required': 'Street is required',
  }),
  city: Joi.string().optional().messages({
    'string.base': 'City must be a string',
    'string.empty': 'City cannot be empty',
    'any.required': 'City is required',
  }),
  country: Joi.string().optional().messages({
    'string.base': 'Country must be a string',
    'string.empty': 'Country cannot be empty',
    'any.required': 'Country is required',
  }),
})

// Define Joi schema for the user
const userSchemaWithJoiForUpdate = Joi.object({
  userId: Joi.string().optional().messages({
    'string.base': 'User ID must be a string',
    'string.empty': 'User ID cannot be empty',
    'any.required': 'User ID is required',
  }),
  username: Joi.string().optional().messages({
    'string.base': 'Username must be a string',
    'string.empty': 'Username cannot be empty',
    'any.required': 'Username is required',
  }),
  password: Joi.string().optional().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
  }),
  fullName: fullnameSchemaWithJoi.optional(),
  age: Joi.number().optional().messages({
    'number.base': 'Age must be a number',
    'any.required': 'Age is required',
  }),
  email: Joi.string().optional().email().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),
  isActive: Joi.boolean().default(false).optional(),
  hobbies: Joi.array().items(Joi.string()).optional(),
  address: addressSchemaWithJoi.optional(),

  orders: Joi.array()
    .optional()
    .items(
      Joi.object({
        productName: Joi.string(),
        price: Joi.number(),
        quantity: Joi.number(),
      }),
    ),
})

export default userSchemaWithJoiForUpdate

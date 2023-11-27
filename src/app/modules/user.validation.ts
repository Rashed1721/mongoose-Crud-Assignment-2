import Joi from 'joi'

const fullNameSchemaWithJoi = Joi.object({
  firstName: Joi.string().required().max(20).trim().messages({
    'any.required': 'First name is required',
    'string.max': 'First name cannot be more than 20 characters',
  }),
  lastName: Joi.string().required().max(20).trim().messages({
    'any.required': 'Last name is required',
    'string.max': 'Last name cannot be more than 20 characters',
  }),
})

const addressSchemaWithJoi = Joi.object({
  street: Joi.string().required().messages({
    'any.required': 'Street is required',
  }),
  city: Joi.string().required().messages({
    'any.required': 'City is required',
  }),
  country: Joi.string().required().messages({
    'any.required': 'Country is required',
  }),
})

const orderSchemaWithJoi = Joi.object({
  productName: Joi.string().required().messages({
    'any.required': 'Product name is required',
  }),
  price: Joi.number().required().messages({
    'any.required': 'Price is required',
    'number.base': 'Price must be a number',
  }),
  quantity: Joi.number().required().messages({
    'any.required': 'Quantity is required',
    'number.base': 'Quantity must be a number',
  }),
})

const userSchemaWithJoi = Joi.object({
  userId: Joi.string().required().messages({
    'any.required': 'User ID is required',
  }),
  username: Joi.string().required().messages({
    'any.required': 'Username is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
  fullName: fullNameSchemaWithJoi.required().messages({
    'any.required': 'Full name is required',
  }),
  age: Joi.number().required().messages({
    'any.required': 'Age is required',
    'number.base': 'Age must be a number',
  }),
  email: Joi.string().required().messages({
    'any.required': 'Email is required',
  }),
  address: addressSchemaWithJoi.required().messages({
    'any.required': 'Address is required',
  }),
  orders: Joi.array().items(orderSchemaWithJoi).optional(),
})

export default userSchemaWithJoi

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fullnameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required'],
        max: [20, "first name can't be more than 20 character"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'first name is required'],
        max: [20, "first name can't be more than 20 character"],
        trim: true,
    },
});
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, '{VALUE} is required'],
    },
    city: {
        type: String,
        required: [true, '{VALUE} is required'],
    },
    country: {
        type: String,
        required: [true, '{VALUE} is required'],
    },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: [true, 'Give your userId'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, '{VALUE} is not correct'],
        unique: true,
    },
    fullName: {
        type: fullnameSchema,
        required: true,
    },
    age: {
        type: Number,
        required: [true, '{VALUE} is required'],
    },
    email: {
        type: String,
        required: [true, '{VALUE} is required'],
        unique: true,
    },
    address: {
        type: addressSchema,
        required: [true, '{VALUE} is required'],
    },
    orders: [
        {
            productName: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
});
const User = (0, mongoose_1.model)('user', userSchema);
exports.default = User;

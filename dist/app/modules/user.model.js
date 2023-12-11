"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
        type: Number,
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
    isActive: {
        type: Boolean,
        default: false,
    },
    hobbies: [
        {
            type: String,
        },
    ],
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
userSchema.pre('find', function (next) {
    this.select('-_id -fullName._id -address._id -password -userId -isActive -hobbies -orders ');
    next();
});
userSchema.pre('findOne', function (next) {
    this.select(' -_id -fullName._id -address._id -password   -orders ');
    next();
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt));
        next();
    });
});
userSchema.pre('deleteOne', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const isUserExists = yield User.findOne(query);
        if (!isUserExists) {
            throw new Error('User does not exists');
        }
    });
});
userSchema.statics.isUserExists = function (userId) {
    const existingUser = User.findOne({ userId });
    return existingUser;
};
const User = (0, mongoose_1.model)('user', userSchema);
exports.default = User;

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
exports.userServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/* eslint-disable no-unused-expressions */
const user_model_1 = __importDefault(require("./user.model"));
const config_1 = __importDefault(require("../config"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(userData);
    return result;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find();
    return result;
});
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.default.isUserExists(userId)) {
        const result = yield user_model_1.default.findOne({ userId });
        return result;
    }
});
const updateUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield user_model_1.default.isUserExists(userId)) {
            if (userData.password) {
                userData.password = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt));
            }
            const result = user_model_1.default.findOneAndUpdate({ userId }, userData, { new: true });
            return result;
        }
    }
    catch (error) {
        throw new Error('user is missing');
    }
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield user_model_1.default.isUserExists(userId)) {
            const result = yield user_model_1.default.deleteOne({ userId });
            return result;
        }
    }
    catch (error) {
        throw new Error('missing is absent');
    }
});
const AddNewProduct = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield user_model_1.default.isUserExists(id)) {
            const addproduct = yield user_model_1.default.updateOne({ userId: id }, {
                $push: { orders: userData },
            }, { new: true });
            return addproduct;
        }
    }
    catch (error) {
        throw new Error('invalid user');
    }
});
const getOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield user_model_1.default.isUserExists(userId)) {
            const result = yield user_model_1.default.findOne({ userId });
            return result;
        }
    }
    catch (error) {
        throw new Error('invalid user');
    }
});
const totalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield user_model_1.default.isUserExists(userId)) {
            const userData = yield user_model_1.default.findOne({ userId }).select('orders');
            const orders = userData === null || userData === void 0 ? void 0 : userData.orders;
            let sum = 0;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
            const totalPrice = orders === null || orders === void 0 ? void 0 : orders.map((order) => {
                const total = order.price * order.quantity;
                sum = sum + total;
            });
            return sum;
        }
    }
    catch (error) {
        throw new Error('no total price');
    }
});
exports.userServices = {
    createUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
    AddNewProduct,
    getOrder,
    totalPrice,
};

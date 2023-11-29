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
exports.userController = void 0;
const user_services_1 = require("./user.services");
const user_model_1 = __importDefault(require("./user.model"));
const user_validation_1 = __importDefault(require("./user.validation"));
const user_validationForUpdate_1 = __importDefault(require("./user.validationForUpdate"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const { error, value } = user_validation_1.default.validate(userData);
        if (error) {
            res.status(500).json({
                success: false,
                message: 'validation error',
                data: error,
            });
        }
        const result = yield user_services_1.userServices.createUser(value);
        const filteredResult = yield user_model_1.default.findById(result._id).select('-password -fullName._id -address._id');
        res.status(200).json({
            success: true,
            message: 'user created successfully!',
            data: filteredResult,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: error,
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.getAllUser();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: error,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_services_1.userServices.getSingleUser(userId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const userData = req.body;
        const { error, value } = user_validationForUpdate_1.default.validate(userData);
        if (error) {
            throw error;
        }
        const result = yield user_services_1.userServices.updateUser(id, value);
        const filteredResult = yield user_model_1.default.findById(id);
        res.status(200).json({
            success: true,
            data: filteredResult,
        });
    }
    catch (error) {
        if (error.message === 'user is missing') {
            res.status(404).json({
                success: false,
                message: 'user not find',
                error: {
                    code: 404,
                    description: 'User not found',
                },
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'error happend',
                error: error.message,
            });
        }
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_services_1.userServices.deleteUser(userId);
        res.status(200).json({
            success: true,
            message: 'user deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        if (error.message === 'missing is absent') {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'something went wrong',
                data: error,
            });
        }
    }
});
const AddNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const userData = req.body;
        const result = yield user_services_1.userServices.AddNewProduct(id, userData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: null,
        });
    }
    catch (error) {
        if (error.message === 'invalid user') {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(500).json({
                success: true,
                message: 'something went wrong',
                data: error.message,
            });
        }
    }
});
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_services_1.userServices.getOrder(userId);
        const filteredResult = yield user_model_1.default.findById(userId).select('orders ');
        res.status(200).json({
            success: true,
            message: ' orders fetched successfully',
            data: filteredResult,
        });
    }
    catch (error) {
        if (error.message === 'invalid user') {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'something went wrong',
                data: error.message,
            });
        }
    }
});
const totalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield user_services_1.userServices.totalPrice(id);
        res.status(200).json({
            success: true,
            message: 'TOtal price calculated successfully',
            data: {
                totalPrice: result === null || result === void 0 ? void 0 : result.toFixed(2),
            },
        });
    }
    catch (error) {
        if (error.message === 'no total price') {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'something went wrong',
                data: error.message,
            });
        }
    }
});
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
    AddNewProduct,
    getOrder,
    totalPrice,
};

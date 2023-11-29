"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/api/users', user_controller_1.userController.createUser);
router.get('/api/users', user_controller_1.userController.getAllUser);
router.get('/api/users/:userId', user_controller_1.userController.getSingleUser);
router.get('/api/users/:userId/orders', user_controller_1.userController.getOrder);
router.get('/api/users/:userId/total-price', user_controller_1.userController.totalPrice);
router.put('/api/users/:userId', user_controller_1.userController.updateUser);
router.delete('/api/users/:userId', user_controller_1.userController.deleteUser);
router.put('/api/users/:userId/orders', user_controller_1.userController.AddNewProduct);
exports.userRoutes = router;

import express from 'express'
import { userController } from './user.controller'
const router = express.Router()

router.post('/api/users', userController.createUser)
router.get('/api/users', userController.getAllUser)
router.get('/api/users/:userId', userController.getSingleUser)
router.get('/api/users/:userId', userController.getOrder)
router.get('/api/users/:userId/total-price', userController.totalPrice)
router.put('/api/users/:userId', userController.updateUser)
router.delete('/api/users/:userId', userController.deleteUser)
router.put('/api/users/:userId/orders', userController.AddNewProduct)

export const userRoutes = router

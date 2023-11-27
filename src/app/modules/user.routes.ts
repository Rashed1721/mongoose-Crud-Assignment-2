import express from 'express'
import { userController } from './user.controller'
const router = express.Router()

router.post('/create-user', userController.createUser)
router.get('/alluser', userController.getAllUser)
router.get('/:id', userController.getSingleUser)
router.put('/api/users/:userId', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export const userRoutes = router

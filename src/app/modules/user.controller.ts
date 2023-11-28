/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { userServices } from './user.services'
import User from './user.model'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const result = await userServices.createUser(userData)
    const { password, ...userWithoutPassword } = result.toObject()

    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: userWithoutPassword,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    })
  }
}
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser()

    res.status(200).json({
      success: true,
      message: 'here is all user',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    })
  }
}
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userServices.getSingleUser(userId)

    res.status(200).json({
      success: true,
      message: ' single user successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const userData = req.body
    const result = await userServices.updateUser(userId, userData)
    const filteredResult = await User.findById(userId).select('-password')
    res.status(200).json({
      success: true,
      message: 'user updated successfully',
      data: filteredResult,
    })
  } catch (error: any) {
    if (error.message === 'missing user1') {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }

    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error.message,
    })
  }
}
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const result = await userServices.deleteUser(userId)

    res.status(200).json({
      success: true,
      message: 'user deleted successfully!',
      data: null,
    })
  } catch (error: any) {
    if (error.message === 'missing is absent') {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    })
  }
}

const AddNewProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const userData = req.body
    const result = await userServices.AddNewProduct(id, userData)
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: null,
    })
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: 'something went wrong',
      data: error.message,
    })
  }
}

const getOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userServices.getOrder(userId)
    const filteredResult = await User.findById(userId).select('orders')

    res.status(200).json({
      success: true,
      message: ' orders retrived successfully',
      data: filteredResult,
    })
  } catch (error: any) {
    if (error.message === 'invalid user') {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        data: error.message,
      })
    }
  }
}

const totalPrice = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const result = await userServices.totalPrice(id)

    res.status(200).json({
      success: true,
      message: 'TOtal price calculated successfully',
      data: {
        totalPrice: result?.toFixed(2),
      },
    })
  } catch (error: any) {
    if (error.message === 'no total price') {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        data: error.message,
      })
    }
  }
}

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
  AddNewProduct,
  getOrder,
  totalPrice,
}

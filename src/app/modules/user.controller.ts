/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { userServices } from './user.services'
import User from './user.model'
import userSchemaWithJoi from './user.validation'
import userSchemaWithJoiForUpdate from './user.validationForUpdate'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const { error, value } = userSchemaWithJoi.validate(userData)
    if (error) {
      res.status(500).json({
        success: false,
        message: 'validation error',
        data: error,
      })
    }
    const result = await userServices.createUser(value)

    const filteredResult = await User.findById(result._id).select(
      '-password -fullName._id -address._id ',
    )

    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: filteredResult,
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
      message: 'Users fetched successfully!',
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
      message: 'User fetched successfully!',
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
    const { error, value } = userSchemaWithJoiForUpdate.validate(userData)
    if (error) {
      throw error
    }

    const result = await userServices.updateUser(userId, value)
    const filteredResult = await User.findOne({ userId }).select(
      '-password -fullName._id -address._id  ',
    )

    res.status(200).json({
      success: true,
      data: filteredResult,
    })
  } catch (error: any) {
    if (error.message === 'user is missing') {
      res.status(404).json({
        success: false,
        message: 'user not find',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'error happend',
        error: error.message,
      })
    }
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
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
    } else {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        data: error,
      })
    }
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
    if (error.message === 'invalid user') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    } else {
      res.status(500).json({
        success: true,
        message: 'something went wrong',
        data: error.message,
      })
    }
  }
}

const getOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userServices.getOrder(userId)
    const filteredResult = await User.findOne({ userId }).select('orders ')

    res.status(200).json({
      success: true,
      message: ' orders fetched successfully',
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
      message: 'Total price calculated successfully',
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

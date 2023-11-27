/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { userServices } from './user.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const result = await userServices.createUser(userData)

    res.status(200).json({
      success: true,
      message: 'user created successfully',
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
    const userId = req.params.id
    const result = await userServices.getSingleUser(userId)

    res.status(200).json({
      success: true,
      message: ' single user successfully',
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
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const userData = req.body
    const result = await userServices.updateUser(userId, userData)

    res.status(200).json({
      success: true,
      message: 'user updated successfully',
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
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const result = await userServices.deleteUser(userId)

    res.status(200).json({
      success: true,
      message: 'user deleted successfully',
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

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
}

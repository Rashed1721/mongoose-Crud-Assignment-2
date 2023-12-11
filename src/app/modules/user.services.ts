import bcrypt from 'bcrypt'
import { TUser } from './user.interface'
/* eslint-disable no-unused-expressions */

import User from './user.model'
import config from '../config'

const createUser = async (userData: TUser) => {
  const result = await User.create(userData)
  return result
}
const getAllUser = async () => {
  const result = await User.find()
  return result
}
const getSingleUser = async (userId: string) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId })

    return result
  }
}

const updateUser = async (userId: string, userData: TUser) => {
  try {
    if (await User.isUserExists(userId)) {
      if (userData.password) {
        userData.password = await bcrypt.hash(
          userData.password,
          Number(config.bcrypt_salt),
        )
      }
      const result = User.findOneAndUpdate({ userId }, userData, { new: true })
      return result
    }
  } catch (error) {
    throw new Error('user is missing')
  }
}

const deleteUser = async (userId: string) => {
  try {
    if (await User.isUserExists(userId)) {
      const result = await User.deleteOne({ userId })
      return result
    }
  } catch (error) {
    throw new Error('missing is absent')
  }
}

const AddNewProduct = async (id: string, userData: TUser) => {
  try {
    if (await User.isUserExists(id)) {
      const addproduct = await User.updateOne(
        { userId: id },
        {
          $push: { orders: userData },
        },
        { new: true },
      )
      return addproduct
    }
  } catch (error) {
    throw new Error('invalid user')
  }
}

const getOrder = async (userId: string) => {
  try {
    if (await User.isUserExists(userId)) {
      const result = await User.findOne({ userId })
      return result
    }
  } catch (error) {
    throw new Error('invalid user')
  }
}

const totalPrice = async (userId: string) => {
  try {
    if (await User.isUserExists(userId)) {
      const userData = await User.findOne({ userId }).select('orders')
      const orders = userData?.orders
      let sum = 0
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const totalPrice = orders?.map((order) => {
        const total = order.price * order.quantity
        sum = sum + total
      })

      return sum
    }
  } catch (error) {
    throw new Error('no total price')
  }
}

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
  AddNewProduct,
  getOrder,
  totalPrice,
}

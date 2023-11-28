/* eslint-disable no-unused-expressions */
import { TUser } from './user.interface'
import User from './user.model'

const createUser = async (userData: TUser) => {
  const result = await User.create(userData)
  return result
}
const getAllUser = async () => {
  const result = await User.find()
  return result
}
const getSingleUser = async (id: string) => {
  if (await User.isUserExists(id)) {
    const result = await User.findById(id)

    return result
  } else {
    return
  }
}

const updateUser = async (id: string, userData: TUser) => {
  try {
    if (await User.isUserExists(id)) {
      const result = await User.findByIdAndUpdate(id, userData, { new: true })
      return result
    } else {
      throw new Error('missing user2')
    }
  } catch (error) {
    throw new Error('missing user1')
  }
}

const deleteUser = async (id: string) => {
  try {
    if (await User.isUserExists(id)) {
      const result = await User.deleteOne({ _id: id })
      return result
    }
  } catch (error) {
    throw new Error('missing is absent')
  }
}

const AddNewProduct = async (id: string, userData: TUser) => {
  const addproduct = await User.updateOne(
    { _id: id },
    {
      $push: { orders: userData },
    },
    { new: true },
  )
  return addproduct
}

const getOrder = async (id: string) => {
  try {
    if (await User.isUserExists(id)) {
      const result = await User.findById(id)
      return result
    }
  } catch (error) {
    throw new Error('invalid user')
  }
}

const totalPrice = async (id: string) => {
  try {
    if (await User.isUserExists(id)) {
      const userData = await User.findById(id).select('orders')
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

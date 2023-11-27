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
  const result = await User.findById(id)
  return result
}
const updateUser = async (id: string, userData: TUser) => {
  console.log(userData)
  const result = await User.findByIdAndUpdate(id, userData, { new: true })
  return result
}
const deleteUser = async (id: string) => {
  const result = await User.deleteOne({ _id: id })
  return result
}

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
}

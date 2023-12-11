import config from '../config'
import { TUser, UserModel, address, fullName } from './user.interface'
import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const fullnameSchema = new Schema<fullName>({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    max: [20, "first name can't be more than 20 character"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'first name is required'],
    max: [20, "first name can't be more than 20 character"],
    trim: true,
  },
})

const addressSchema = new Schema<address>({
  street: {
    type: String,
    required: [true, '{VALUE} is required'],
  },
  city: {
    type: String,
    required: [true, '{VALUE} is required'],
  },
  country: {
    type: String,
    required: [true, '{VALUE} is required'],
  },
})

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'Give your userId'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, '{VALUE} is not correct'],
  },
  fullName: {
    type: fullnameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: [true, '{VALUE} is required'],
  },
  email: {
    type: String,
    required: [true, '{VALUE} is required'],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  hobbies: [
    {
      type: String,
    },
  ],
  address: {
    type: addressSchema,
    required: [true, '{VALUE} is required'],
  },

  orders: [
    {
      productName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
})

userSchema.pre('find', function (next) {
  this.select(
    '-_id -fullName._id -address._id -password -userId -isActive -hobbies -orders ',
  )
  next()
})
userSchema.pre('findOne', function (next) {
  this.select(' -_id -fullName._id -address._id -password   -orders ')
  next()
})

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt))
  next()
})

userSchema.pre('deleteOne', async function () {
  const query = this.getQuery()
  const isUserExists = await User.findOne(query)
  if (!isUserExists) {
    throw new Error('User does not exists')
  }
})

userSchema.statics.isUserExists = function (userId: string) {
  const existingUser = User.findOne({ userId })
  return existingUser
}

const User = model<TUser, UserModel>('user', userSchema)

export default User

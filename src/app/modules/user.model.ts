import { TUser, UserModel, address, fullName } from './user.interface'
import { Schema, model } from 'mongoose'

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
    type: String,
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
    unique: true,
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
    unique: true,
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
    '-_id -fullName._id -address._id -password -userId -isActive -hobbies -orders',
  )
  next()
})
userSchema.pre('findOne', function (next) {
  this.select(' -_id -fullName._id -address._id -password   -orders')
  next()
})

userSchema.statics.isUserExists = function (id: string) {
  const existingUser = User.findById(id)
  return existingUser
}

const User = model<TUser, UserModel>('user', userSchema)

export default User

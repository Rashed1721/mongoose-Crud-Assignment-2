export type fullName = {
  firstName: string
  lastName: string
}

export type address = {
  street: string
  city: string
  country: string
}

export type TUser = {
  userId: string
  username: string
  password: string
  fullName: fullName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: address
  orders?: [
    {
      productName: string
      price: number
      quantity: number
    },
  ]
}

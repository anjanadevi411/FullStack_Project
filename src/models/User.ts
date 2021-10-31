/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

//import orderSchema, {OrderDocument} from './Order'
export type UserDocument = Document & {
  name: string
  picture: string
  email: string
  givenName: string
  familyName: string
  address: string
  phoneNo: string
  role: string
  order: string[]
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  givenName: {
    type: String,
  },
  familyName: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  role: {
    type: String,
  },
  //order: [orderSchema]
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
})

export default mongoose.model<UserDocument>('User', UserSchema)

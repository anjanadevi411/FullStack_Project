/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type OrderDocument = Document & {
  userId: string
  bookId: string
  quantity: number
}

const orderSchema = new mongoose.Schema({
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  bookId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },

  //   userId: {
  //     type: String,
  //     required: true
  //   },
  //   bookId: {
  //     type: String,
  //     required: true,
  //   },
})

export default mongoose.model<OrderDocument>('Order', orderSchema)

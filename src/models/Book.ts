/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

import variantSchema, { VariantDocument } from './Variant'
//import orderSchema, {OrderDocument} from './Order'

export type BookDocument = Document & {
  title: string
  image: string
  author: string[]
  price: number
  publishedYear: string
  genres: string[]
  rating: string
  description: string
  //order: OrderDocument[]
  order: string[]
  variant: VariantDocument[]
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  image: {
    type: String,
  },
  // author: {
  //   type: String,
  // },
  price: {
    type: Number,
  },
  publishedYear: {
    type: String,
  },
  genres: [String],
  rating: {
    type: String,
    min: 0,
  },
  description:{
    type: String,
  },
  //order: [orderSchema],
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  variant: [variantSchema],
})

export default mongoose.model<BookDocument>('Book', bookSchema)

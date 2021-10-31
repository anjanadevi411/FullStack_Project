/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type VariantDocument = Document & {
  language: string
  bookWithCd: string
}

const variantSchema = new mongoose.Schema({
  language: {
    type: String,
    index: true,
  },
  bookWithCd: {
    type: String,
    required: true,
  },
})

export default variantSchema

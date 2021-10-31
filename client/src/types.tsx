import { VariantDocument } from "../../src/models/Variant"

export type User = {
  email:string,
  givenName: string,
  familyName: string,
}

export type Book = Document & {
  _id: string
  title: string
  image: string
  author: string
  price: number
  publishedYear: string
  genres: string[]
  rating: string
  description: string
  order: string[]
  variant: VariantDocument[]
}


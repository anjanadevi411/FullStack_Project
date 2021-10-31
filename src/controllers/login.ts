import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../util/secrets'
import { UserDocument } from '../models/User'

// POST /login
export const loginUser = async (req: Request, res: Response) => {
  const userData = req.user as UserDocument
  console.log('user data from controller of login', userData)
  const token = jwt.sign({ userData }, JWT_SECRET, { expiresIn: '2h' })
  console.log('token', token)
  res.json({ token: token})
}

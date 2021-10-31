import express from 'express'
import passport from 'passport'
import { loginUser } from '../controllers/login'

const router = express.Router()

router.post(
  '/',
  passport.authenticate('google-id-token', { session: false }),
  loginUser
)

export default router

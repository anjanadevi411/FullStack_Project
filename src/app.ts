import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import passport from 'passport'

import loginRouter from './routers/login'
import movieRouter from './routers/movie'
import userRouter from './routers/user'
import bookRouter from './routers/book'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import compression from 'compression'
import cors from 'cors'

import { googleStrategy, jwtStrategy } from './config/passport'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.use(cors())
app.set('port', process.env.PORT || 3000)
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(passport.initialize())

//passport strategies
passport.use(googleStrategy)
passport.use(jwtStrategy)

//login router
app.use('/api/v1/google/login', loginRouter)

// Use movie router
app.use('/api/v1/movies', movieRouter)

//Use User router
app.use('/api/v1/users', userRouter)

//Use Book router
app.use('/api/v1/books', bookRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app

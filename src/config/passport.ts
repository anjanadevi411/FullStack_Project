import GoogleTokenStratergy from 'passport-google-id-token'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import UserService from '../services/user'
import { JWT_SECRET } from './../util/secrets'

//const LocalStrategy = passportLocal.Strategy
export const googleStrategy = new GoogleTokenStratergy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  async (parsedToken: any, googleId: any, done: any) => {
    console.log('parsed token', parsedToken)

    const user = await UserService.findOrCreate(parsedToken.payload)

    //2 arguments first arg is error object second arg is data you want to forward
    done(null, user)
  }
)

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // token = req.headers.authorization.split(" ")[1]
  },
  // this payload is the token payload
  async (payload: any, done: any) => {
    console.log('payload stra', payload)

    const { email } = payload.userData
    const user = await UserService.findOneByEmail(email)
    console.log('user in jwt', user)
    done(null, user)
  }
)

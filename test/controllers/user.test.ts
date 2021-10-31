import request, {Response} from 'supertest'
import jwt from 'jsonwebtoken'

import dbConnect, { MongodHelper } from '../db-helper'

import User, { UserDocument } from '../../src/models/User'
import app from '../../src/app'

import UserServices from '../../src/services/user'
import { JWT_SECRET } from '../../src/util/secrets'


describe('user controller', () => {
    let dbHelper: MongodHelper
    let createdUserResponse: Response
    let createdUser: any
    let token: string
  
    beforeAll(async () => {
      dbHelper = await dbConnect()
    })
  
    beforeEach(async () => {
      await dbHelper.clearDatabase()
      const userPayload = 
      {
        givenName: 'Anju', 
        familyName: 'Koppu', 
        email: 'anjana@gmail.com', 
        address: 'Denmark',
        phoneNo: 589666, 
        role: 'admin', 
        order: [] 
      }
      createdUserResponse = await request(app).post('/api/v1/users').send(userPayload)
      const userData = {
        name: 'Anju',
        email: 'anju@gmail.com',
        givenName: 'Anjana',
        familyName: 'Devi',
      }
      const userDocument = new User(userData)
      createdUser = UserServices.createUser(userDocument)
      token = jwt.sign({user:createdUser}, JWT_SECRET)
    })
  
    afterAll(async () => {
      await dbHelper.closeDatabase()
    })

    it('should create a user',async()=>{
      //const userPayload = {givenName: 'Anju', familyName: 'Koppu', email: 'anjana@gmail.com', address: 'Denamrk',
      // phoneNo: 589666, role: 'admin', order: [] }
       //const response = await request(app).post('/api/v1/users').send(userPayload)
        console.log('response status',createdUserResponse.status)
        console.log('response body',createdUserResponse.body)
       expect(createdUserResponse.status).toBe(200)
       expect(createdUserResponse.body).toHaveProperty('_id')
       expect(createdUserResponse.body).toHaveProperty('givenName','Anju')
    })
    it('should give all the users',async()=>{
      const response = await request(app).get('/api/v1/users') 
      expect (response.body.length).toEqual(1)
      expect(response.body[0]).toHaveProperty('_id')
      expect(createdUserResponse.body).toHaveProperty('familyName','Koppu')
    })

    it('should not delete a user if not logged in', async()=>{
      const userId = createdUserResponse.body._id
      const response = await request(app).delete(`/api/v1/users/${userId}`)
      expect(response.status).toBe(401)
    })
    it('should delete a movie when logged in',async()=>{
      const userId = createdUserResponse.body._id
      const response = await request(app).delete(`/api/v1/users/${userId}`).set({Authorization: `Bearer ${token}`})
      expect(response.status).toBe(204)
    })

})
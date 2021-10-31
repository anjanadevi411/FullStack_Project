import React from 'react'

import GoogleLogin from 'react-google-login';
import jwt_decode from 'jwt-decode'
import {useHistory} from "react-router-dom"

import axios from 'axios'
import { User } from '../types';

type Response = {
    token: string
    userData: User
  }

  type LoginProps = {
    setUser: (user:User) =>void
  }


  function Login({setUser}: LoginProps) {
    const history = useHistory() 
    const responseGoogle = async(response: any) => {
      console.log('response from frontend',response.tokenId);
      const tokenId = response.tokenId
      
      const result = await axios.post<Response>('/google/login', {
        id_token: tokenId,
      })
      console.log('result from axios',result)
      const jwtToken = result.data.token
      console.log('jwttoken',jwtToken)
      localStorage.setItem('token',jwtToken)

      const decodeData = jwt_decode(result.data.token) as any

      console.log('decoded email address ', decodeData.userData.givenName)
      const decodeUser = decodeData.userData.givenName
      localStorage.setItem('name', decodeUser)

    
      //localStorage.setItem('user',userData)
      if(result.status === 200){
        history.push('/')
      }
    }
    
    return (
      <div>
        <GoogleLogin
      clientId="1087592962095-ees3nkkuoog57kg7f3lrd24otjvlnvt3.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
      </div>
    );
  }
  
  export default Login;
  

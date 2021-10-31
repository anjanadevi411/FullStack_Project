import React from 'react'
import {useHistory} from "react-router-dom"

const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
}

function Logout() {
    const history = useHistory()
    history.push('/')
    return (
        <div>
            <button onClick={logout}> LOGOUT</button>
        </div>
    )
}

export default Logout


    

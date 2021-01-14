import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
    const { currentUser } = useAuth()

    return (
        <div>
            <p>You are logged in as <strong>{currentUser.email}</strong></p>
        </div>
    )
}

export default Home
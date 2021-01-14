import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const contextValues = {
        currentUser,
        loading,
        login,
        logout,
        signup,
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {loading && (<p>Just a moment..</p>)}
            {!loading && props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, useAuth, AuthProvider as default }

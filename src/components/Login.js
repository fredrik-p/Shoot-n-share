import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { Alert } from 'react-bootstrap'


const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()


        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/home")
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    }
    return (
        <div className="log-box">
            <form onSubmit={handleSubmit}>

                <h3>Log in</h3>
                {error && <Alert variant="danger">{error}</Alert>}

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" ref={emailRef} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" ref={passwordRef} placeholder="Enter password" />
                </div>

                <button disabled={loading} type="submit" className="btn btn-dark btn-lg btn-block">Log in</button>
                <p className="forgot-password text-right">
                    Don't have an account? <Link to="/sign-up">Sign up</Link>
                </p>

            </form>
        </div>
    )
}

export default Login
import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { Alert } from 'react-bootstrap'

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/home")
        } catch {
            setError("Failed to log in. Please try again!")
        }

        setLoading(false)
    }

    return (

        <div className="log-box">

            <h3>Sign Up</h3>
            {error && <Alert variant="danger">{error}</Alert>}

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" ref={emailRef} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" ref={passwordRef} placeholder="Enter password" />
                </div>

                <button disabled={loading} type="submit" className="btn btn-dark btn-lg btn-block">Let's go!</button>
                <p className="forgot-password text-right">
                    Already registered? <Link to="/login">Log In</Link>
                </p>
            </form>
        </div>

    )
}

export default Signup
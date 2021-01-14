import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Jumbotron, Container, Button } from 'react-bootstrap'
import logobig from '../assets/images/logo.svg'

const Home = () => {
    const { currentUser } = useAuth()

    return (

        <Jumbotron>
            <Container>
                <div className="centering">
                    <h1>Welcome fellow photographer!</h1>
                    <img
                        alt="logo"
                        src={logobig}
                        width="100"
                        height="100"
                        className="d-inline-block align-top mb-2 mt-2"
                    />
                    <p>You are logged in as <strong>{currentUser.email}</strong></p>

                    <Link to="/albums"><Button variant="dark" size='md'>Go ahead to your albums..</Button></Link>
                </div>
            </Container>
        </Jumbotron>
    )
}

export default Home
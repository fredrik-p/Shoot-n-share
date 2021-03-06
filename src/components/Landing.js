import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import logobig from '../assets/images/logo.svg'

export const Landing = () => {
    return (
        <div>
            <div className="row">
                <div className="col-lg-12 mt-5 text-center">
                    <img
                        alt="logo"
                        src={logobig}
                        width="100"
                        height="100"
                        className="d-inline-block align-top"
                    />
                    <h1>Shoot n'share</h1>
                    <p>The better way for modern photographers to share images with clients.
					</p>
                    <Link to="/sign-up"><Button variant="info" size='lg'>Get started</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default Landing
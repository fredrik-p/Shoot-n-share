import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'

export const Navigation = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
                <Container>
                    <Link to="/">
                        <Navbar.Brand>
                            <img
                                alt="logo"
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}<h5>Shoot n' share</h5>
                        </Navbar.Brand>
                    </Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavLink to="/login" className="nav-link">Log in</NavLink>
                            <NavLink to="/sign-up" className="nav-link">Sign up</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation
import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import logo from '../assets/images/logo.svg'

export const Navigation = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt="logo"
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}<h5>Shoot n' share</h5>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/login">Log in</Nav.Link>
                            <Nav.Link href="/sign-up">Sign up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation
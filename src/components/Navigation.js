import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/images/logo.svg'
import { VscSignOut } from "react-icons/vsc";

const Navigation = () => {
	const { currentUser, logout } = useAuth()
	const handleLogout = () => {
		logout()
	}
	return (
		<div>
			<Navbar collapseOnSelect expand="sm" bg="transparent" variant="light">
				<Container>
					{
						currentUser ? (
							<>
								<Link to="/home">
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

							</>
						) : (
								<>
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
								</>
							)
					}

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">

							{
								currentUser ? (
									<>
										<NavLink className="nav-link" to="/albums" className="nav-link">Albums</NavLink><NavLink className="nav-link" to="/login" onClick={handleLogout}><VscSignOut /></NavLink>

									</>
								) : (
										<>
											<NavLink to="/login" className="nav-link">Login</NavLink>
											<NavLink to="/sign-up" className="nav-link">Sign Up</NavLink>
										</>
									)
							}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div >
	)
}

export default Navigation
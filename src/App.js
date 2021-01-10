import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import logo from './assets/images/logo.svg'
import background from './assets/images/bg-home.jpg';
import './assets/scss/app.scss'

const App = () => {
	return (
		<>
			<div style={{
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
				backgroundRepeat: 'no-repeat',
				height: '100vh'
			}}>
				<Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
					<Container>
						<Navbar.Brand href="#home">
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


				<Container>
					<div className="row">
						<div className="col-lg-12 mt-5 text-center">
							<img
								alt="logo"
								src={logo}
								width="100"
								height="100"
								className="d-inline-block align-top"
							/>
							<h1>Shoot n'share</h1>
							<p>The better way for modern photographers to share images with clients.
					</p>
							<Button variant="info" size='lg'>Get started</Button>
						</div>
					</div>
				</Container>
			</div>
		</>
	)
}

export default App


import React from 'react'
import { Container, Button } from 'react-bootstrap'
import Navigation from './components/Navigation'
import background from './assets/images/bg-home.jpg'
import logobig from './assets/images/logo.svg'
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
				<Navigation />


				<Container>
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
							<Button variant="info" size='lg'>Get started</Button>
						</div>
					</div>
				</Container>
			</div>
		</>
	)
}

export default App


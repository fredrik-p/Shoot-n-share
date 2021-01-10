import React from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Landing from './components/Landing'
import SignUp from './components/Signup'
import LogIn from './components/Login'
import LogOut from './components/Logout'
import background from './assets/images/bg-home.jpg'
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
					<Routes>
						<Route path="/">
							<Landing />
						</Route>
						<Route path="/logout">
							<LogOut />
						</Route>
						<Route path="/login">
							<LogIn />
						</Route>
						<Route path="/sign-up">
							<SignUp />
						</Route>

					</Routes>

				</Container>
			</div>
		</>
	)
}

export default App


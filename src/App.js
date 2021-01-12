import React from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import AuthRoute from './components/AuthRoute'
import Navigation from './components/Navigation'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Logout from './components/Logout'
import Home from './components/Home'
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
				<AuthProvider>
					<Navigation />
					<Container>

						<Routes>
							<Route path="/">
								<Landing />
							</Route>
							<AuthRoute path="/home">
								<Home />
							</AuthRoute>
							<Route path="/logout">
								<Logout />
							</Route>
							<Route path="/login">
								<Login />
							</Route>
							<Route path="/sign-up">
								<Signup />
							</Route>
						</Routes>

					</Container>
				</AuthProvider>
			</div>
		</>
	)
}

export default App


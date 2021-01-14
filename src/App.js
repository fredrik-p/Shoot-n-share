import React from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import AuthRoute from './components/AuthRoute'
import Navigation from './components/Navigation'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Album from './components/albums/Album'
import Albums from './components/albums/Albums'
import CreateAlbum from './components/albums/CreateAlbum'
import SimpleReactLightbox from 'simple-react-lightbox'
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
					<SimpleReactLightbox>
						<Navigation />
						<Container>

							<Routes>
								<Route path="/">
									<Landing />
								</Route>
								<AuthRoute path="/home">
									<Home />
								</AuthRoute>
								<Route path="/albums">
									<AuthRoute path="/">
										<Albums />
									</AuthRoute>

									<AuthRoute path="/create">
										<CreateAlbum />
									</AuthRoute>

									<AuthRoute path="/:albumId">
										<Album />
									</AuthRoute>
								</Route>
								<Route path="/login">
									<Login />
								</Route>
								<Route path="/sign-up">
									<Signup />
								</Route>

								<Route path="*" element={<NotFound />} />
							</Routes>

						</Container>
					</SimpleReactLightbox>
				</AuthProvider>
			</div>
		</>
	)
}

export default App


import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import useAlbums from '../../hooks/useAlbums'
import AlbumsGrid from './AlbumsGrid'

const Albums = () => {
    const { currentUser } = useAuth()
    const { albums, loading } = useAlbums(currentUser.uid)

    return (
        <>
            <h2 className="mb-3">All Albums</h2>

            {
                loading && currentUser
                    ? (<p>Just a second..</p>)
                    : (<AlbumsGrid albums={albums} />)
            }

            {currentUser && (
                <div className="mt-3">
                    <Link to="/albums/create" className="btn btn-dark btn-md">Create a new Album</Link>
                </div>
            )}
        </>
    )
}

export default Albums

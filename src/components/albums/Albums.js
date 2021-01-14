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
            {currentUser && (
                <div className="mt-3 centered">
                    <Link to="/albums/create" className="btn btn-dark btn-md mb-3">Create a new Album</Link>
                </div>
            )}
            {
                loading && currentUser
                    ? (<p>Just a second..</p>)
                    : (<AlbumsGrid albums={albums} />)
            }
        </>
    )
}

export default Albums

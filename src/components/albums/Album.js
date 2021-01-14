import React from 'react'
import { useParams } from 'react-router-dom'
import ImagesGrid from './ImagesGrid'
import useAlbum from '../../hooks/useAlbum'
import UploadAlbumImage from './UploadAlbumImage'

const Album = () => {
    const { albumId } = useParams()
    const { album, images, loading } = useAlbum(albumId)

    return (
        <>
            <div className="album-header">
                <h3>{album && album.title}</h3>
            </div>
            <UploadAlbumImage albumId={albumId} />

            {loading
                ? (<p>Just a moment..</p>)
                : (<ImagesGrid images={images} />)
            }
        </>
    )
}

export default Album

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ImagesGrid from './ImagesGrid'
import useAlbum from '../../hooks/useAlbum'
import UploadAlbumImage from './UploadAlbumImage'
import { Button } from 'react-bootstrap'

const Album = () => {
    const { albumId } = useParams()
    const { album, images, loading } = useAlbum(albumId)
    const [reviewLink, setReviewLink] = useState(null)
    const handleCreateReviewLink = (album) => {
        let urlOrigin = window.location.origin
        let url = `${urlOrigin}/review/${album}`;
        setReviewLink(url);
    }

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

            <div className="create-link-btn">
                <Button variant="dark" onClick={() => { handleCreateReviewLink(albumId) }}>Create review link for client</Button>
            </div>

            {
                reviewLink && (

                    <div className="client-link">
                        <p>Review link: <a href={reviewLink}>{reviewLink}</a></p>

                    </div>


                )
            }
        </>
    )
}

export default Album

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ImagesGrid from './ImagesGrid'
import useAlbum from '../../hooks/useAlbum'
import UploadAlbumImage from './UploadAlbumImage'
import EditAlbumTitle from './EditAlbumTitle'
import { Button } from 'react-bootstrap'
import { FiEdit3 } from "react-icons/fi";


const Album = () => {
    const { albumId } = useParams()
    const { album, images, loading } = useAlbum(albumId)
    const [reviewLink, setReviewLink] = useState(null)
    const [editTitle, setEditTitle] = useState(false)

    const handleEditTitle = () => {
        setEditTitle(true);
    };

    const handleCreateReviewLink = (album) => {
        let urlOrigin = window.location.origin
        let url = `${urlOrigin}/review/${album}`;
        setReviewLink(url);
    }

    return (
        <>
            {editTitle
                ? <EditAlbumTitle album={album} />
                : <>
                    <div className="album-header">
                        <h3>{album && album.title}</h3>
                        <span
                            className="edit_album_title"
                            onClick={handleEditTitle}>
                            <FiEdit3 /> Edit album title
                        </span>
                    </div>


                    <UploadAlbumImage albumId={albumId} />

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

                    {loading
                        ? (<p>Just a moment..</p>)
                        : (<ImagesGrid images={images} />)
                    }

                </>
            }
        </>

    )
}

export default Album

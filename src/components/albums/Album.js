import React, { useState } from 'react'
<<<<<<< HEAD
import { useParams } from 'react-router-dom'
=======
import { useNavigate, useParams } from 'react-router-dom'
>>>>>>> 2f1b613 (delete album added and create new album from current album images works)
import ImagesGrid from './ImagesGrid'
import useAlbum from '../../hooks/useAlbum'
import UploadAlbumImage from './UploadAlbumImage'
import EditAlbumTitle from './EditAlbumTitle'
<<<<<<< HEAD
import { Button } from 'react-bootstrap'
import { FiEdit3 } from "react-icons/fi";
=======
import { Button, Alert } from 'react-bootstrap'
import { FiEdit3 } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import { db, storage } from '../../firebase'
>>>>>>> 2f1b613 (delete album added and create new album from current album images works)


const Album = () => {
    const { albumId } = useParams()
    const { album, images, loading } = useAlbum(albumId)
    const [reviewLink, setReviewLink] = useState(null)
    const [editTitle, setEditTitle] = useState(false)
<<<<<<< HEAD
=======
    const { currentUser } = useAuth()
    const [selectedImages, setSelectedImages] = useState([])
    const [error, setError] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false)
    const navigate = useNavigate()

>>>>>>> 2f1b613 (delete album added and create new album from current album images works)

    const handleEditTitle = () => {
        setEditTitle(true);
    };

    const handleCreateReviewLink = (album) => {
        let urlOrigin = window.location.origin
        let url = `${urlOrigin}/review/${album}`;
        setReviewLink(url);
    }

<<<<<<< HEAD
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
=======
    const updateSelectedImages = (e) => {
        const [image] = images.filter(image => (image.id === e.target.id));

        if (e.target.checked === true) {
            setSelectedImages(images => [...images, image]);
        } else {
            const updatedImageArray = selectedImages.filter(image => (image.id !== e.target.id))
            setSelectedImages(updatedImageArray);
        }
    };

    const handleCreateNewAlbum = async () => {
        const title = prompt('New album title:');

        if (title.length < 4) {
            setError('Title must be at least 3 chars.')
            return;
        };

        setError(false);
        setBtnDisabled(true);

        try {
            const docRef = await db.collection('albums').add({
                title,
                owner: currentUser.uid
            });

            await selectedImages.forEach(selectedImage => {
                const image = {
                    name: selectedImage.name,
                    path: selectedImage.name,
                    size: selectedImage.size,
                    type: selectedImage.type,
                    owner: currentUser.uid,
                    url: selectedImage.url,
                }
                if (albumId) {
                    image.album = db.collection('albums').doc(docRef.id)
                }
                db.collection('images').add(image);
                storage.ref(`images/selected/${image.name}`).put(image);
            });
            navigate(`/albums`);
        } catch (err) {
            setError(err.message);
            setBtnDisabled(false);
        };
    };

    return (
        <>
            <div className="text-center">
                {loading
                    ? (<p>Just a moment..</p>)
                    : album &&
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

                                <UploadAlbumImage albumId={albumId} />
                                <ImagesGrid images={images} updateSelectedImages={updateSelectedImages} />
                                {
                                    selectedImages.length > 0 && (
                                        <div className="text-center mt-3">
                                            <p className="selected-photos">Selected photos: {selectedImages.length}</p>
                                            <div className="d-flex justify-content-center">
                                                <Button
                                                    disabled={btnDisabled}
                                                    className="btn btn-dark mb-4"
                                                    onClick={handleCreateNewAlbum}>
                                                    Create new album
                                </Button>

                                            </div>
                                        </div>
                                    )
                                }

                                <div>
                                    {
                                        error && (
                                            <Alert variant="danger" className="text-center mt-3">{error}</Alert>
                                        )
                                    }
                                </div>

                            </>

                        }
                    </>
                }
            </div>
>>>>>>> 2f1b613 (delete album added and create new album from current album images works)
        </>
    )
}

export default Album

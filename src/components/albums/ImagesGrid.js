import React, { useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import useUploadImage from '../../hooks/useUploadImage';
import { db, storage } from '../../firebase/index'
import useDeleteImage from '../../hooks/useDeleteImage'
import { VscTrash } from 'react-icons/vsc'

const ImagesGrid = ({ images }) => {
    const setUploadImage = useState(null);
    const navigate = useNavigate()
    const [deleteImage, setDeleteImage] = useState(null);
    const { currentUser } = useAuth()
    useDeleteImage(deleteImage);

    const handleDeleteImage = (image) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Delete the image\n"${image.name}"?`)) {
            setDeleteImage(image);
        }
    }

    const handleNewAlbum = () => {
        db.collection("albums").add({
            title: 'New album',
            owner: currentUser.uid,
            images: []
        })
            .then(docRef => {
                selectedImages.forEach(image => {
                    const ref = storage.refFromURL(image)
                    setUploadImage(ref, docRef.id)
                })
                setSelectedImages([])
                navigate(`/album/${docRef.id}`)
            })
            .catch(error => {

            });
    }
    const [selectedImages, setSelectedImages] = useState([])
    const handleSelectedImages = (e) => {
        const url = e.target.attributes.target.textContent

        if (selectedImages.includes(url)) {
            setSelectedImages(selectedImages.filter(image => image !== url))
        } else {
            setSelectedImages(prev => [...prev, url])
        }
    }
    return (

        <SRLWrapper>
            <Row className="my-3">
                {images.map(image => (
                    <Col sm={6} md={4} lg={3} key={image.id}>
                        <Card className="mb-3">
                            <a href={image.url} title="View image in lightbox" data-attribute="SRL">
                                <Card.Img variant="top" src={image.url} title={image.name} />
                            </a>
                            <Card.Body>
                                <Card.Text className="text small">
                                    {image.name}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <input target={image.url} onClick={handleSelectedImages} type="checkbox" />
                                </div>
                                {
                                    currentUser.uid === image.owner && (
                                        <Button className="delbtn" variant="danger" size="sm" onClick={() => {
                                            handleDeleteImage(image)
                                        }}>
                                            <VscTrash />
                                        </Button>
                                    )
                                }
                            </Card.Body>
                        </Card>

                    </Col>
                ))}
            </Row>
            <div className="mt-4">
                {selectedImages.length > 0 && (<Button className="mr-3 mb-3" variant="primary" onClick={handleNewAlbum}>Create new album</Button>)}
            </div>
        </SRLWrapper>


    )
}

export default ImagesGrid

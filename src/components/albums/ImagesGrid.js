import React, { useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import { useAuth } from '../../contexts/AuthContext'
import useDeleteImage from '../../hooks/useDeleteImage'
import { VscTrash } from 'react-icons/vsc'

const ImagesGrid = ({ images, updateSelectedImages }) => {
    const [deleteImage, setDeleteImage] = useState(null);
    const { currentUser } = useAuth()
    useDeleteImage(deleteImage);

    const handleDeleteImage = (image) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Delete the image\n"${image.name}"?`)) {
            setDeleteImage(image);
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
                                <div>
                                    <input
                                        type="checkbox"
                                        id={image.id}
                                        name="selected-photo"
                                        className="mr-2"
                                        onChange={updateSelectedImages}
                                    />
                                    <label htmlFor="selected-photo" className="select">Select image</label>
                                </div>
                                <Card.Text className="text small">
                                    {image.name}
                                </Card.Text>

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
        </SRLWrapper>


    )
}

export default ImagesGrid

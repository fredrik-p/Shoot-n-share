import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../../firebase'
import useAlbum from '../../hooks/useAlbum'
import { Alert, Button, Col, Container, Card, Row } from 'react-bootstrap'
import { SRLWrapper } from "simple-react-lightbox"
import { FiThumbsUp } from "react-icons/fi";
import { FiThumbsDown } from "react-icons/fi";
import moment from 'moment'

const ReviewAlbum = () => {
    const [likedImages, setLikedImages] = useState([]);
    const [reviewedImages, setReviewedImages] = useState([]);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const { albumId } = useParams();
    const navigate = useNavigate();
    const { album, images, loading } = useAlbum(albumId);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getImages() {
            const imageList = await Promise.all(
                images.map(image => {
                    return {
                        id: image.id,
                        like: undefined
                    }
                })
            )
            setReviewedImages(imageList);
        }
        getImages();
    }, [images]);

    useEffect(() => {
        let likedArray = reviewedImages.filter(image => {
            return image.like === true
        });
        setLikedImages(likedArray);

        let result = reviewedImages.every(image => image.like !== undefined);
        if (result === false) {
            setDisabledBtn(true);
            return;
        } else if (result === true) {
            setDisabledBtn(false);
        }
    }, [reviewedImages])

    const updateImage = (image, reaction) => {

        let updatedArray = reviewedImages.map(item => {
            if (item.id === image.id) {
                return {
                    like: reaction,
                    name: image.name,
                    path: `images/guest/${image.name}`,
                    size: image.size,
                    type: image.type,
                    url: image.url,
                }
            } else {
                return item;
            }
        })
        setReviewedImages(updatedArray);
        toggleThumbs(image.id, reaction);
    }

    const handleSendReview = async () => {
        const title = `${album.title} - Reviewed on ${moment().format("MMMM Do YYYY")}`;

        setError(false);

        try {
            const docRef = await db.collection('albums').add({
                title,
                owner: album.owner,
                reviewedAlbum: true
            });

            await likedImages.forEach(likedImage => {
                storage.ref(`images/guest/${likedImage.name}`).put(likedImage);

                if (albumId) {
                    likedImage.album = db.collection('albums').doc(docRef.id)
                    likedImage.owner = album.owner
                }
                db.collection('images').add(likedImage)
            })

            navigate('/review/thanks');
        } catch (err) {
            setError(err.message);
        }
    }

    const toggleThumbs = (id, reaction) => {
        let card = document.getElementById(id);
        if (reaction === true) {
            card.getElementsByClassName('thumbsup')[0].classList.add('thumbsup-active');
            card.getElementsByClassName('thumbsdown')[0].classList.remove('thumbsdown-active');
        } else if (reaction === false) {
            card.getElementsByClassName('thumbsdown')[0].classList.add('thumbsdown-active');
            card.getElementsByClassName('thumbsup')[0].classList.remove('thumbsup-active');
        }
    }

    return (
        <Container fluid className="px-4">
            <h2 className="text-left">You are currently reviewing: {album && album.title}</h2>
            <p>Please press like or dislike to choose which images you want to keep.</p>

            {
                reviewedImages && likedImages.length > 0 && (
                    <div className="text-left mt-3">
                        <p>Liked Images: {likedImages.length} / {images.length}</p>

                        {
                            error && (
                                <Alert variant="danger">{error}</Alert>
                            )
                        }
                    </div>
                )
            }

            <SRLWrapper>
                <Row className="justify-content-md-left">
                    {loading
                        ? (<p>Just wait a sec..</p>)

                        : (
                            images.map(image => (
                                <Col xs={12} sm={6} md={4} lg={3} key={image.id}>
                                    <Card>
                                        <a href={image.url} >
                                            <Card.Img variant="top" src={image.url} />
                                        </a>
                                        <Card.Body className="d-flex justify-content-between" id={image.id}>
                                            <button
                                                style={{ border: "none", backgroundColor: "transparent" }}
                                                className="thumbsup"
                                                onClick={() => updateImage(image, true)} >
                                                <FiThumbsUp
                                                />
                                            </button>

                                            <button
                                                style={{ border: "none", backgroundColor: "transparent" }}
                                                className="thumbsdown"
                                                onClick={() => updateImage(image, false)} >
                                                <FiThumbsDown
                                                />
                                            </button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )
                    }
                </Row>
            </SRLWrapper>

            <div className="d-flex justify-content-center">
                <Button
                    disabled={disabledBtn}
                    variant="dark"
                    className="mt-3 mb-3"
                    onClick={handleSendReview}>
                    Send Review
                            </Button>
            </div>

        </Container>
    )
}

export default ReviewAlbum
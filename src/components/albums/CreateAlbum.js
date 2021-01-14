import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'

const CreateAlbum = () => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (title.length < 4) {
            return;
        }

        setError(false)
        setLoading(true)

        try {
            const docRef = await db.collection('albums').add({
                title,
                owner: currentUser.uid,
            })

            navigate(`/albums/${docRef.id}`)
        } catch (e) {
            setError(e.message)
            setLoading(false)
        }
    }

    return (
        <div className="log-box">
            <form onSubmit={handleSubmit}>

                <h3>Create a new album</h3>
                {error && <Alert variant="danger">{error}</Alert>}

                <div className="form-group">
                    <label>Album title</label>
                    <input type="title" className="form-control" onChange={handleTitleChange} value={title} required />
                </div>

                <button disabled={loading} type="submit" className="btn btn-dark btn-lg btn-block">Create</button>

            </form>
        </div>
    )
}

export default CreateAlbum

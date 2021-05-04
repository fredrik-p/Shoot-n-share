import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const useAlbums = () => {
    const [albums, setAlbums] = useState([])
    const { currentUser } = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // register a snapshot-listener on firestore for all available albums
        const unsubscribe = db.collection('albums').orderBy('title')
            .where('owner', '==', currentUser.uid)
            .onSnapshot(snapshot => {
                setLoading(true)
                const snapshotAlbums = []

                snapshot.forEach(doc => {
                    snapshotAlbums.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })

                setAlbums(snapshotAlbums)
                setLoading(false)
            })

        return unsubscribe
    }, [currentUser.uid])

    return { albums, loading }
}

export default useAlbums

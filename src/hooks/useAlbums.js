import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useAlbums = (userId) => {
    const [albums, setAlbums] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // register a snapshot-listener on firestore for all available albums
        const unsubscribe = db.collection('albums').orderBy('title')
            .where('owner', '==', userId)
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
    }, [userId])

    return { albums, loading }
}

export default useAlbums

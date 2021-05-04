import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext'

const useUploadImage = (image, albumId = null) => {
	const [uploadProgress, setUploadProgress] = useState(null);
	const [uploadedImage, setUploadedImage] = useState(null);
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const { currentUser } = useAuth()

	useEffect(() => {
		if (!image) {
			setUploadProgress(null);
			setUploadedImage(null);
			setError(null);
			setIsSuccess(false);

			return;
		}
		// reset environment
		setError(null);
		setIsSuccess(false);

		// get file reference
		const fileRef = storage.ref(`images/${currentUser.uid}/${image.name}`);
		// FUTURE FEATURE: Check if a file with this path already exists and
		// prepend current timestamp to filename.
		fileRef.getMetadata()
			.then(() => {
				// If the ref already exists:
				fileRef.getMetadata().then(async (metadata) => {
					const img = {
						name: metadata.name,
						path: metadata.fullPath,
						size: metadata.size,
						type: metadata.type,
						//url: metadata.customMetadata.url,
					};
					console.log(albumId)
					// this is always null fix this
					if (albumId) {
						img.album = db.collection('albums').doc(albumId)
					}
					await db.collection('images').add(img)
				})
			})
			.catch(() => {
				// upload image to fileRef
				const uploadTask = fileRef.put(image);

				// attach listener for `state_changed`-event
				uploadTask.on('state_changed', taskSnapshot => {
					setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
				});

				// are we there yet?
				uploadTask.then(async snapshot => {
					// retrieve URL to uploaded file
					const url = await snapshot.ref.getDownloadURL();
					console.log(url)
					// add uploaded file to db
					const img = {
						name: image.name,
						owner: currentUser.uid,
						path: snapshot.ref.fullPath,
						size: image.size,
						type: image.type,
						url,
					};

					// get docRef to album (if set)
					if (albumId) {
						img.album = db.collection('albums').doc(albumId)
					}

					// add image to collection
					await db.collection('images').add(img)

					// let user know we're done
					setIsSuccess(true);
					setUploadProgress(null);

					// file has been added to db, refresh list of files
					setUploadedImage(img);
					setIsSuccess(true);
					console.log("catch")
				}).catch(error => {
					console.error("File upload triggered an error!", error);
					setError({
						type: "warning",
						msg: `Image could not be uploaded due to an error (${error.code})`
					});
				});
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image, currentUser]);

	return { uploadProgress, uploadedImage, error, isSuccess };
}

export default useUploadImage;

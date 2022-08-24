import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../firebase/config'

export const useCollection = (collectionName) => {
	const [documents, setDocuments] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		const collectionRef = collection(firestore, collectionName)

		const unsubscribe = onSnapshot(collectionRef, (snap) => {
			const res = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			setDocuments(res)
		})

		return () => {
			unsubscribe()
		}
	}, [collectionName])

	return { documents, error }
}

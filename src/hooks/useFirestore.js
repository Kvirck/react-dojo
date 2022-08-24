import { addDoc, collection } from 'firebase/firestore'
import { useReducer } from 'react'
import { firestore } from '../firebase/config'

const initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null,
}

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case 'IS_PENDING':
			return { ...state, isPending: action.payload }
		case 'ERROR':
			return { ...state, error: action.payload }
		case 'ADDED_DOCUMENT':
			return { ...state, document: action.payload }
		default:
			return state
	}
}

export const useFirestore = (collectionName) => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState)

	const collectionRef = collection(firestore, collectionName)

	const addDocument = async (document) => {
		dispatch({ type: 'IS_PENDING', payload: true })
		try {
			const response = await addDoc(collectionRef, document)

			dispatch({ type: 'ADDED_DOCUMENT', payload: response })
		} catch (err) {
			dispatch({ type: 'ERROR', payload: err.message })
		}
	}

	return { addDocument, response }
}

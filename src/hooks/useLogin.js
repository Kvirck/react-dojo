import { signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/config.js'
import { useAuthContext } from './useAuthContext.js'


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCanceled, setIsCanceled] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password)

            dispatch({ type: 'LOGIN', payload: user })
            
            if (!isCanceled) {
                setError(null)
                setIsPending(false)
            }
        } catch (err) {
            if (!isCanceled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCanceled(true)
    }, [])
    return { login, error, isPending, isCanceled }
}
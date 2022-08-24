import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../firebase/config.js'
import { useAuthContext } from './useAuthContext.js'


export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            await signOut(auth)
            dispatch({type: 'LOGOUT'})

            setError(null)
            setIsPending(false)
        } catch (err) {
            setError(err.message)
            setIsPending(false)
        }
    }

    return { logout, error, isPending }
}
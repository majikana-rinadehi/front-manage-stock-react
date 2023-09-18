import { signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth'
import { useState } from 'react'
import { firebaseApp } from '@/lib/firebase'

const auth = firebaseApp.fireauth
const provider = new GoogleAuthProvider()

export const useGoogleAuth = () => {

    const [error, setError] = useState<string>('')
    const [user, setUser] = useState<UserCredential['user']>()

    const signIn = async (): Promise<boolean> => {
        const user = await signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user)
                return result.user
            })
            .catch((err: Error) => {
                setError(err.message)
                return null
            })
        return user ? true : false
    }

    return {error, user, signIn}
}
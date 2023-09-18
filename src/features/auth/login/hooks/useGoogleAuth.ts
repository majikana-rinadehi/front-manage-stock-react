import { signInWithPopup, signOut, GoogleAuthProvider, UserCredential } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { firebaseApp } from '@/lib/firebase'

const auth = firebaseApp.fireauth
const provider = new GoogleAuthProvider()

export const useGoogleAuth = () => {

    const [error, setError] = useState<string>('')
    const [user, setUser] = useState<UserCredential['user'] | null>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
        })

        return () => unsubscribe()
    }, [firebaseApp])

    const signingIn = async (): Promise<boolean> => {
        const user = await signInWithPopup(auth, provider)
            .then((result) => {
                return result.user
            })
            .catch((err: Error) => {
                setError(err.message)
                return null
            })
        return user ? true : false
    }

    const signingOut = async (): Promise<boolean> => {
        const result = await signOut(auth)
            .then((result) => {
                return true
            })
            .catch((err: Error) => {
                setError(err.message)
                return false
            })
        return result
    }

    return {error, user, signIn: signingIn, signingOut}
}
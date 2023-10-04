import { signInWithPopup, signOut, GoogleAuthProvider, UserCredential } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { firebaseApp } from '@/lib/firebase'

const auth = firebaseApp.fireauth
const provider = new GoogleAuthProvider()

export const useGoogleAuth = () => {

    const [error, setError] = useState<string>('')
    const [googleUser, setGoogleUser] = useState<UserCredential['user'] | null>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setGoogleUser(user)
        })

        return () => unsubscribe()
    }, [firebaseApp])

    const signingInWithPopup = async (): Promise<UserCredential['user'] | null> => {
        console.log('signInWithRedirect start')
        try {
            // await signInWithRedirect(auth, provider)
            //     .then()
            //     .catch((err) => {
            //         console.log('err:', err)
            //     })
            // const result = await getRedirectResult(auth)
            //     .then()
            //     .catch((err) => {
            //         console.log('err:', err)
            //     })
            const result = await signInWithPopup(auth, provider)
            console.log('result:', result)
            return result ? result.user : null
        } catch(e) {
            console.log(e)
        }
        console.log('null')
        return null
    }

    const signingOut = async (): Promise<boolean> => {
        const result = await signOut(auth)
            .then((_) => {
                return true
            })
            .catch((err: Error) => {
                setError(err.message)
                return false
            })
        return result
    }

    return { error, googleUser, signingInWithPopup, signingOut }
}
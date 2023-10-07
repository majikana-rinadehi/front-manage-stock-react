import { postSigninWithProviders } from "../api/post-signin-with-providers"
import { UserCredential } from "firebase/auth"
import { useAppDispatch } from "@/lib/hooks"
import { setUser } from "../state/slice"

export const useUserAuth = () => {

    const dispatch = useAppDispatch()

    const signInWithProvider = async (user: UserCredential['user']) => {
        const res = await postSigninWithProviders({
            authProvider: 'google',
            uid: user.uid,
        })
        console.log('res', res)
        dispatch(setUser({
            id: res.id!,
            mailAddress: res.mailAddress,
            name: res.name
        }
        ))
    }

    return {
        signInWithProvider
    }
}
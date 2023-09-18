import { FcGoogle } from 'react-icons/fc'
import { AiFillWarning } from 'react-icons/ai'
import { useGoogleAuth } from '../hooks/useGoogleAuth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const Login = () => {

    const [errMsg, setErrMsg] = useState('')

    const {signIn} = useGoogleAuth()
    const navigate = useNavigate()

    const onClickGoogleLogin = async () => {
        setErrMsg('')
        const result = await signIn()
        if (result) {
            navigate('/app/stockList')
        }
        setErrMsg('ログインに失敗しました。')

    }

    return (
        <>
            <div className="mt-4 flex items-center text-lg text-black">
                <AiFillWarning className={'h-7 w-7 text-yellow-400'}/>
                ログインしてください
            </div>
            <div className="mt-16 w-9/12 min-h-[8rem] rounded-xl py-4 px-6 flex flex-col justify-center items-center box-shadow bg-[#f5f5f5]">
                <div className="py-1 px-10 text-center box-shadow 
                                    flex align-middle items-center rounded-3xl bg-[#D9D9D9] text-sm text-black font-semibold"
                    onClick={onClickGoogleLogin}>
                    <FcGoogle className={'h-7 w-7 mr-2'}/>
                    Googleでログイン
                </div>
            </div>
            <div className='text-black'>
                {errMsg}
            </div>
        </>
    )
}
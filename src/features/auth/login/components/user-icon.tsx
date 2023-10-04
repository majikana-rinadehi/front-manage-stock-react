import { useGoogleAuth } from '@/features/auth/login/hooks/useGoogleAuth'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export const UserIcon = () => {

    const { signingOut, googleUser } = useGoogleAuth()
    const navigate = useNavigate()

    const [showUserMenu, setShowUserMenu] = useState(false)

    const onClickUserIcon = async () => {
        if (!googleUser) {
            return
        }
        setShowUserMenu(true)
    }

    const onClickCancel = () => {
        setShowUserMenu(false)
    }

    const onClickLogoutButton = async () => {
        const result = await signingOut()
        console.log(result)
        setShowUserMenu(false)
        if (result) {
            navigate('/login')
        }
    }

    const ModalElement = (
        <>
            <div
                onClick={onClickCancel}
                className="fixed z-30 top-0 left-0 bottom-0 right-0">
            </div>
            <div className="fixed z-50 -translate-x-20">
                <div className='w-32 rounded-xl py-4 px-6 box-shadow bg-[#f5f5f5] text-black '>
                    <div onClick={onClickLogoutButton}>ログアウト</div>
                </div>
            </div>
        </>
    )
    
    return (
        <div className='fixed z-10 right-1 top-7'>
            <div className='ml-2 pr-3 pb-1 flex flex-col justify-end'
                onClick={onClickUserIcon}
            >
                <FaUserCircle className={'text-3xl text-[#605959]'} />
            </div>
    
            {
                showUserMenu
                    ?
                    ModalElement
                    :
                    null
            }
    
        </div>
    )
}
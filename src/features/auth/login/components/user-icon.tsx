import { useGoogleAuth } from '@/features/auth/login/hooks/useGoogleAuth'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { UserEdit } from './user-edit'

export const UserIcon = () => {

    const { signingOut, googleUser } = useGoogleAuth()
    const navigate = useNavigate()

    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showEditUserModal, setShowEditUserModal] = useState(false)

    const onClickUserIcon = async () => {
        if (!googleUser) {
            return
        }
        setShowUserMenu(true)
    }

    const onClickCancel = () => {
        setShowUserMenu(false)
    }

    const onCloseModal = () => {
        setShowEditUserModal(false)
        setShowUserMenu(false)
    }

    const onClickUserEditButton = () => {
        setShowEditUserModal(true)
    }

    const onClickLogoutButton = async () => {
        const result = await signingOut()
        console.log(result)
        setShowUserMenu(false)
        if (result) {
            navigate('/login')
        }
    }

    const MenuElement = () => (
        <div className='z-50'>
            <div
                onClick={onClickCancel}
                className="fixed top-0 left-0 bottom-0 right-0">
            </div>
            <div className="fixed -translate-x-28">
                <div className='w-40 rounded-xl py-4 px-6 box-shadow flex flex-col items-center bg-[#f5f5f5] text-black '>
                    <div className='' onClick={onClickUserEditButton}>ユーザ情報編集</div>
                    <div className='mt-4' onClick={onClickLogoutButton}>ログアウト</div>
                </div>
            </div>
        </div>
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
                    <MenuElement />
                    :
                    null
            }

            {/* ユーザ編集フォームモーダル */}
            {
                showEditUserModal ? (
                    <div
                        className="overflow-y-scroll z-20 fixed top-0 left-0 right-0 mt-44 h-full flex justify-center text-inherit"
                    >
                        {/* オーバーレイ */}
                        <div
                            onClick={onCloseModal}
                            className="fixed inset-0 bg-black opacity-50">
                        </div>
                        {/* フォーム */}
                        <UserEdit onCloseModal={onCloseModal} />
                    </div>
                ) : null
            }

        </div>
    )
}
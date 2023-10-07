import { FormItem } from "@/features/ui/form/form_item"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { type User } from "../type/types"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { editUser, userSelector } from "../state/slice"

export type Props = {
    onCloseModal: () => void
}
export const UserEdit = (props: Props) => {

    const user = useAppSelector(userSelector)
    const [editItem, setEditItem] = useState<User>(user!)
    const dispatch = useAppDispatch()
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, itemProperty: keyof User) => {
        console.log(e.target.value)
        setEditItem((prevItem) => {
            const newItem: User = { ...prevItem }
            newItem[itemProperty] = e.target.value 
            return newItem
        })
    }

    const onClickUpdate = async() => {
        console.log("onClickUpdate")
        console.log(editItem)
        await dispatch(editUser({id: editItem.id, user: editItem}))
        props.onCloseModal()
    }

    return (
        <>
            <div className="h-min pb-8 w-72 z-30 bg-[#F5F5F5] rounded-[20px] text-black">
                <div className="m-4 flex">
                    <div className="text-2xl font-bold">編集✏️</div>
                    <div className="ml-auto"
                        onClick={() => onClickUpdate()}>
                        <FontAwesomeIcon icon={faCheck} size="2xl" color="#0FAEA5" />
                    </div>
                </div>
                {/* item */}
                <FormItem onChange={(e) => onInputChange(e, 'name')} value={editItem.name} itemName="ユーザ名" placeHolder="" />
                <FormItem onChange={(e) => onInputChange(e, 'mailAddress')} value={editItem.mailAddress} itemName="メールアドレス" placeHolder="" />
            </div>
        </>
    )
}
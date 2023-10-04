import { FormItem } from "@/features/ui/form/form_item"
import { faCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { type StockCategory as CategoryType, removeCategory, editCategory } from "@/features/stock"
import { useState } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { DeleteDialog } from "./delete-dialog"

export type Props = CategoryType & {
    onCloseModal: () => void
}
export const CategoryEdit = (props: Props) => {

    const [editItem, setEditItem] = useState<CategoryType>(props)
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const onClickTrash = () => {
        setShowDeleteDialog(true)
    }
    
    const onClickDelete = async() => {
        console.log("onClickDelete")
        console.log(props.id)
        // awaitをつけないと、次のような順番になってしまい、削除が一覧に反映されない
        // 参考: chrome reduxツールのタイムライン
        // stock/delete/pending => stock/fetch/pending => stock/fetch/fullfilled => stock/delete/fullfilled
        await dispatch(removeCategory(props.id))
        setShowDeleteDialog(false)
        props.onCloseModal()
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setEditItem((prevItem) => {
            const newItem = {...prevItem, name: e.target.value}
            return newItem
        })
    }

    const onClickUpdate = async() => {
        console.log("onClickUpdate")
        console.log(editItem)
        await dispatch(editCategory({id: editItem.id, category: editItem}))
        props.onCloseModal()
    }

    return (
        <>
            <div className="h-[360px] w-72 z-20 bg-[#F5F5F5] rounded-[20px] text-black">
                <div className="m-4 flex">
                    <div className="text-2xl font-bold">編集✏️</div>
                    <div className="ml-auto"
                        onClick={() => onClickUpdate()}>
                        <FontAwesomeIcon icon={faCheck} size="2xl" color="#0FAEA5" />
                    </div>
                    <div className="ml-6"
                        onClick={() => onClickTrash()}>
                        <FontAwesomeIcon icon={faTrashCan} size="2xl" color="#D30A0A" />
                    </div>
                </div>
                {/* item */}
                <FormItem onChange={(e) => onInputChange(e)} value={editItem.name} itemName="カテゴリ名" placeHolder="例: 食材" />
            </div>
            {
                showDeleteDialog ? <DeleteDialog onClickCancel={() => setShowDeleteDialog(false)} onClickDelete={() => onClickDelete()}/> : null
            }
        </>
    )
}
import { FormItem } from "@/features/ui/form/form_item"
import { faCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { removeStock, type Stock as StockType } from "@/features/stock"
import { getYYYYMMDD } from "@/utils/format"
import { useState } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { DeleteDialog } from "./delete-dialog"

export type Props = StockType & {
    onCloseModal: () => void
}
export const StockEdit = (props: Props) => {

    const [editItem, setEditItem] = useState<StockType>(props)
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
        await dispatch(removeStock(props.id))
        setShowDeleteDialog(false)
        props.onCloseModal()
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, itemProperty: keyof StockType) => {
        console.log(e.target.value)
        setEditItem((prevItem) => {
            const newItem: StockType = { ...prevItem }
            newItem[itemProperty] = e.target.value
            return newItem
        })
    }

    return (
        <>
            <div className="h-[360px] w-72 z-20 bg-[#F5F5F5] rounded-[20px] text-black">
                <div className="m-4 flex">
                    <div className="text-2xl font-bold">編集✏️</div>
                    <div className="ml-auto">
                        <FontAwesomeIcon icon={faCheck} size="2xl" color="#0FAEA5" />
                    </div>
                    <div className="ml-6"
                        onClick={() => onClickTrash()}>
                        <FontAwesomeIcon icon={faTrashCan} size="2xl" color="#D30A0A" />
                    </div>
                </div>
                {/* item */}
                <FormItem onChange={(e) => onInputChange(e, "name")} value={editItem.name} itemName="品名" placeHolder="例: きゅうり" />
                <div className="mx-6 flex gap-4">
                    {/* amount */}
                    <FormItem onChange={(e) => onInputChange(e, "amount")} value={editItem.amount} itemName="数量" placeHolder="例: 3" classNameAdd="w-1/2 mx-0" />
                    {/* unit */}
                    <FormItem onChange={(e) => onInputChange(e, "name")} value={editItem.name} itemName="単位" placeHolder="例: 本" classNameAdd="w-1/2 mx-0" />
                </div>
                {/* expireDate */}
                <FormItem onChange={(e) => onInputChange(e, "expireDate")} value={editItem.expireDate ? getYYYYMMDD(editItem.expireDate) : ""} itemName="期限" placeHolder="例: 2023/09/01" />
            </div>
            {
                showDeleteDialog ? <DeleteDialog onClickCancel={() => setShowDeleteDialog(false)} onClickDelete={() => onClickDelete()}/> : null
            }
        </>
    )
}
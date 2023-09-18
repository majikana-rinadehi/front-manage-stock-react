import { FormItem } from "@/features/ui/form/form_item"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { addStock, type StockCreate as StockType } from "@/features/stock"
import { useState } from "react"
import { useAppDispatch } from "@/lib/hooks"

export type Props = {
    categoryId: number,
    onCloseModal: () => void
}


export const StockCreate = (props: Props) => {
    
    const initializeStock = (): StockType => {
        return {
            id: 0,
            amount: 0,
            // TODO: apply real user id from login info
            userId: 1,
            categoryId: props.categoryId,
            isExpired: false,
            name: "",
            expireDate: ""
        }
    
    }

    const [editItem, setEditItem] = useState<StockType>(initializeStock)
    const dispatch = useAppDispatch()

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, itemProperty: keyof StockType) => {
        console.log(e.target.value)
        setEditItem((prevItem) => {
            const newItem: StockType = { ...prevItem }
            newItem[itemProperty] = typeof newItem[itemProperty] === 'number' 
                ? parseInt(e.target.value)
                : e.target.value 
            return newItem
        })
    }

    const onClickCreate = async() => {
        console.log("onClickCreate")
        console.log(editItem)
        await dispatch(addStock({stock: editItem}))
        props.onCloseModal()
    }

    return (
        <>
            <div className="h-[360px] w-72 z-20 bg-[#F5F5F5] rounded-[20px] text-black">
                <div className="m-4 flex">
                    <div className="text-2xl font-bold">作成</div>
                    <div className="ml-auto"
                        onClick={() => onClickCreate()}>
                        <FontAwesomeIcon icon={faCheck} size="2xl" color="#0FAEA5" />
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
                <FormItem onChange={(e) => onInputChange(e, "expireDate")} value={editItem.expireDate} itemName="期限" placeHolder="例: 2023-09-01" />
            </div>
        </>
    )
}
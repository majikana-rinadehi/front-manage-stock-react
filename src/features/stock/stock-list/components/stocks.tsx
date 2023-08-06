import { Stock } from "@/features/stock/stock-list/components"
import type { Stock as StockType } from "@/features/stock"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPercent, faCalendarCheck as faCalendar, faPlus } from "@fortawesome/free-solid-svg-icons"

import { useState } from "react"
import classNames from "classnames"
import { StockEdit } from "../../stock-edit/components/stock-edit"

type Props = {
    stocks: StockType[]
    onCloseEditModal: () => void
}

export const Stocks = (props: Props) => {

    type DisplayType = 'percent' | 'calendar'

    const [displayType, setDisplayType] = useState<DisplayType>("percent")
    const [showModal, setShowModal] = useState<boolean>(false)
    const [editingItem, setEditingItem] = useState<StockType | null>(null)

    const onClickStock = (stock: StockType) => {
        setShowModal(true)
        setEditingItem(stock)
    }

    const onCloseModal = () => {
        console.log("onCloseModal")
        setShowModal(false)
        setEditingItem(null)
        console.log("stocks: onCloseEditModal")
        props.onCloseEditModal()
    }

    return (
        <div className="w-9/12 min-h-[28rem] rounded-xl py-4 px-6 box-shadow bg-[#f5f5f5]">
            {/* stock list */}

            {/* icon area */}
            <div className="flex">
                {/* percent icon */}
                <div className={classNames("text-slate-400 mr-5",
                    {
                        "border-b-4 border-b-slate-400": displayType === "percent"
                    }
                )} onClick={() => (setDisplayType("percent"))}>
                    <FontAwesomeIcon icon={faPercent} size="2x" />
                </div>
                {/* calendar icon */}
                <div className={classNames("text-slate-400 mr-5",
                    {
                        "border-b-4 border-b-slate-400": displayType === "calendar"
                    }
                )} onClick={() => (setDisplayType("calendar"))}>
                    <FontAwesomeIcon icon={faCalendar} size="2x" />
                </div>

            </div>
            <div className="mt-4 flex flex-wrap justify-between">
                {/* stock */}
                {props.stocks.map((v, i) => (
                    <Stock stock={v} displayType={displayType} key={i} onClickStock={onClickStock} />
                ))}

                {/* add stock button */}
                <div className="mb-5 relative flex justify-center items-center 
                                h-[6.5rem] w-[6.5rem] bg-[#d9d9d9] rounded-3xl box-shadow">
                    <FontAwesomeIcon icon={faPlus} size="xl" color="black" />
                </div>
            </div>

            {/* 在庫編集フォームモーダル */}
            {
                showModal ? (
                    <div
                        className="overflow-y-scroll z-10 fixed top-0 left-0 right-0 mt-44 h-full flex justify-center text-inherit"
                    >
                        {/* オーバーレイ */}
                        <div
                            onClick={onCloseModal}
                            className="fixed inset-0 bg-black opacity-50">
                        </div>
                        {/* フォーム */}
                        <StockEdit {...editingItem!} onCloseModal={onCloseModal}/>
                    </div>
                ) : null
            }
        </div>
    )
}
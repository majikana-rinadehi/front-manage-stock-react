import { Stock } from "@/features/stock/stock-list/components"
import { StockCategory, type Stock as StockType } from "@/features/stock"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPercent, faCalendarCheck as faCalendar, faPlus, faEllipsis } from "@fortawesome/free-solid-svg-icons"

import { useState } from "react"
import classNames from "classnames"
import { StockEdit } from "../../stock-edit/components/stock-edit"
import { StockCreate } from "../../stock-create/components/stock-create"
import { CategoryEdit } from "../../category-edit/components/category-edit"

type Props = {
    stocks: StockType[],
    categoryId: number | null,
    onCloseEditModal: () => void
    category: StockCategory
}

export const Stocks = (props: Props) => {

    type DisplayType = 'percent' | 'calendar'

    const [displayType, setDisplayType] = useState<DisplayType>("percent")
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
    const [editingItem, setEditingItem] = useState<StockType | null>(null)
    const [showEditCategoryModal, setShowEditCategoryModal] = useState<boolean>(false)

    const onClickStock = (stock: StockType) => {
        setShowEditModal(true)
        setEditingItem(stock)
    }

    const onClickAddButton = () => {
        // 作成済みのカテゴリが存在しない場合
        if (props.categoryId === null) return
        setShowCreateModal(true)
    }

    const onCloseModal = () => {
        console.log("onCloseModal")
        setShowEditModal(false)
        setShowCreateModal(false)
        setShowEditCategoryModal(false)
        setEditingItem(null)
        console.log("stocks: onCloseEditModal")
        props.onCloseEditModal()
    }

    const onClickEditCategoryButton = () => {
        setShowEditCategoryModal(true)
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
                <div className={classNames("text-slate-400 ml-auto")}
                    onClick={onClickEditCategoryButton}>
                    <FontAwesomeIcon icon={faEllipsis} size="2x" />
                </div>

            </div>
            <div className="mt-4 flex flex-wrap justify-between">
                {/* stock */}
                {props.stocks.map((v, i) => (
                    <Stock stock={v} displayType={displayType} key={i} onClickStock={onClickStock} />
                ))}

                {/* add stock button */}
                <div
                    onClick={onClickAddButton}
                    className="mb-5 relative flex justify-center items-center 
                                h-[6.5rem] w-[6.5rem] bg-[#d9d9d9] rounded-3xl box-shadow">
                    <FontAwesomeIcon icon={faPlus} size="xl" color="black" />
                </div>
            </div>

            {/* 在庫編集フォームモーダル */}
            {
                showEditModal ? (
                    <div
                        className="overflow-y-scroll z-10 fixed top-0 left-0 right-0 mt-44 h-full flex justify-center text-inherit"
                    >
                        {/* オーバーレイ */}
                        <div
                            onClick={onCloseModal}
                            className="fixed inset-0 bg-black opacity-50">
                        </div>
                        {/* フォーム */}
                        <StockEdit {...editingItem!} onCloseModal={onCloseModal} />
                    </div>
                ) : null
            }

            {/* 在庫作成フォームモーダル */}
            {
                showCreateModal ? (
                    <div
                        className="overflow-y-scroll z-10 fixed top-0 left-0 right-0 mt-44 h-full flex justify-center text-inherit"
                    >
                        {/* オーバーレイ */}
                        <div
                            onClick={onCloseModal}
                            className="fixed inset-0 bg-black opacity-50">
                        </div>
                        {/* フォーム*/}
                        <StockCreate onCloseModal={onCloseModal} categoryId={props.categoryId!} />
                    </div>
                ) : null
            }

            {/* 在庫編集フォームモーダル */}
            {
                showEditCategoryModal ? (
                    <div
                        className="overflow-y-scroll z-10 fixed top-0 left-0 right-0 mt-44 h-full flex justify-center text-inherit"
                    >
                        {/* オーバーレイ */}
                        <div
                            onClick={onCloseModal}
                            className="fixed inset-0 bg-black opacity-50">
                        </div>
                        {/* フォーム */}
                        <CategoryEdit {...props.category} onCloseModal={onCloseModal} />
                    </div>
                ) : null
            }
        </div>
    )
}
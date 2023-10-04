import { StockCategory } from "@/features/stock"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { CategoryCreate } from "../../category-create/components/category-create"

type Props = {
    stockCategories: StockCategory[]
    selectedId: number | null
    setSelectedId: (id: number) => void
}

export const StockListHeader = (props: Props) => {

    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

    const onClickAddButton = () => {
        setShowCreateModal(true)
    }

    const onCloseModal = () => {
        setShowCreateModal(false)
    }

    const badge = (
        <div className="absolute top-0 right-0 translate-x-2 -translate-y-2">
            <FontAwesomeIcon icon={faCircleExclamation} size="sm" color="red" />
        </div>
    )

    const createCategoryModal = (
        <div
            className="overflow-y-scroll z-20 fixed top-0 left-0 right-0 mt-44 h-full flex justify-center text-inherit"
        >
            {/* オーバーレイ */}
            <div
                onClick={onCloseModal}
                className="fixed inset-0 bg-black opacity-50">
            </div>
            {/* フォーム*/}
            <CategoryCreate onCloseModal={onCloseModal} />
        </div>
    )

    return (

        <>
            {
                showCreateModal
                    ?
                    createCategoryModal
                    :
                    null
            }
            {
                props.stockCategories.length === 0
                    ?
                    <div className="w-3/5 my-5 flex justify-center">
                        <div className="text-black"
                            onClick={onClickAddButton}>
                            <FontAwesomeIcon icon={faPlus} size="lg" color="black" />
                            カテゴリを追加
                        </div>
                    </div >
                    :
                    <div className="w-3/5 my-5 flex items-center">
                        <div className="w-full flex justify-around">
                            {
                                props.stockCategories.map((v, i) => (
                                    <div
                                        key={i}
                                        className={classNames("relative", {
                                            "rounded-lg box-shadow p-1 px-2 font-black bg-slate-400 text-white": v.id === props.selectedId,
                                            "p-1": v.id !== props.selectedId
                                        })}
                                        onClick={() => props.setSelectedId(v.id)}>

                                        {v.hasExpiredStock ? badge : null}
                                        <div className={classNames("text-xl",
                                            {
                                                'text-gray-500': v.id !== props.selectedId
                                            }
                                        )}>
                                            {v.name}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="text-black"
                            onClick={onClickAddButton}>
                            <FontAwesomeIcon icon={faPlus} size="lg" color="black" />
                        </div>
                    </div>
            }
        </>
    )
}
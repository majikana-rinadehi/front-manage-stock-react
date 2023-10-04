import { StockListHeader, Stocks } from "@/features/stock/stock-list/components"
import { useEffect, useState } from "react"
import { fetchStock, fetchCategory, stockWithIsExpiredSelector, categoryWithHasExpiredStockSelector } from "@/features/stock"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { userSelector } from "@/features/auth/login/state/slice"

export const StockList = () => {

    const [selectedId, setSelectedId] = useState<number | null>(null)

    const categories = useAppSelector(categoryWithHasExpiredStockSelector)
    const stocks = useAppSelector(stockWithIsExpiredSelector)
    const stockStatus = useAppSelector(state => state.stock.stock.status)
    const categoryStatus = useAppSelector(state => state.stock.category.status)
    const dispatch = useAppDispatch()

    const user = useAppSelector(userSelector)

    useEffect(() => {
        (async () => {
            if (stockStatus === 'idle') {
                console.log('user:', user)
                await dispatch(fetchStock(user?.id!))
            }
            if (categoryStatus === 'idle') {
                await dispatch(fetchCategory(user?.id!))
            }

            const selectedId = categories.length > 0 ? categories[0].id : null
            setSelectedId((prevSelectedId) => {
                const isDeletedId = categories.findIndex(category => category.id === prevSelectedId) === -1
                if (prevSelectedId === null || isDeletedId) {
                    return selectedId
                }
                return prevSelectedId
            }
            )
        }
        )()

    }, [stocks, categories])

    const onCloseEditModal = () => {
        console.log("stock-list: onCloseEditModal")
        dispatch(fetchStock(user?.id!))
        dispatch(fetchCategory(user?.id!))
    }

    return (
        <>
            {/* list header */}
            <StockListHeader
                stockCategories={categories}
                selectedId={selectedId}
                setSelectedId={setSelectedId} />
            {/* list */}
            <Stocks
                category={categories.filter(v => v.id === selectedId)[0]}
                categoryId={selectedId}
                onCloseEditModal={onCloseEditModal}
                stocks={stocks.filter(v => v.categoryId === selectedId)} />
        </>
    )
}
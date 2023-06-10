import { StockListHeader, Stocks } from "@/features/stock/stock-list/components"
import { useEffect, useState } from "react"
import { stockSelector, fetchStock, categorySelector, fetchCategory } from "@/features/stock"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"

export const StockList = () => {

    const [selectedId, setSelectedId] = useState<number>(1)

    const stocks = useAppSelector(stockSelector)
    const categories = useAppSelector(categorySelector)
    const stockStatus = useAppSelector(state => state.stock.stock.status)
    const categoryStatus = useAppSelector(state => state.stock.category.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (stockStatus === 'idle') {
            dispatch(fetchStock())
        }
        if (categoryStatus === 'idle') {
            dispatch(fetchCategory())
        }

    }, [stocks, categories])

    return (
        <>
            {/* list header */}
            <StockListHeader
                stockCategories={categories}
                selectedId={selectedId}
                setSelectedId={setSelectedId} />
            {/* list */}
            <Stocks
                stocks={stocks.filter(v => v.categoryId === selectedId)} />
        </>
    )
}
import { StockListHeader, Stocks } from "@/features/stock/stock-list/components"
import type { Stock, StockCategory } from "@/features/stock"
import { useState } from "react"

// TODO: fetch data
const stocks: Stock[] = [
    {
        name: "塩",
        amount: 70,
        isExpired: false
    },
    {
        name: "みりん",
        amount: 10,
        isExpired: true
    },
    {
        name: "めんつゆ",
        amount: 10,
        isExpired: true
    },
    {
        name: "料理酒",
        amount: 80,
        isExpired: false
    },
    {
        name: "酢",
        amount: 100,
        isExpired: false
    },
]

const stockCategories: StockCategory[] = [
    {
        id: 1,
        name: "食材",
        hasExpiredStock: true,
    },
    {
        id: 2,
        name: "調味料",
        hasExpiredStock: true,
    },
    {
        id: 3,
        name: "消耗品",
        hasExpiredStock: false,
    },
]

export const StockList = () => {

    const [selectedId, setSelectedId] = useState<number>(1)

    return (
        <>
            {/* list header */}
            <StockListHeader 
                stockCategories={stockCategories} 
                selectedId={selectedId}/>
            {/* list */}
            <Stocks stocks={stocks} />
        </>
    )
}
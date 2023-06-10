import type { StockCategory } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"

// apiよりcategoriessを取得する
export const getCategories = async (): Promise<StockCategory[]> => {
    return await axiosInstance.get<StockCategory[]>("/api/categories")
        .then(res => {
            return res.data
        })
}

export const stockCategories: StockCategory[] = [
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
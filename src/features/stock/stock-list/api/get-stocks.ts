import type { Stock } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"

// apiよりstocksを取得する
export const getStocks = async (): Promise<Stock[]> => {
    return await axiosInstance.get<Stock[]>("/api/stocks")
        .then(res => {
            return res.data
        })
}
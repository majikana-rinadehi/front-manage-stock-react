import type { ApiResponse, Stock } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"

// apiよりstocksを取得する
export const getStocks = async (): Promise<Stock[]> => {
    return await axiosInstance.get<ApiResponse<Stock>>("/stocks")
        .then(res => {
            return res.data.results
        })
        .catch(err => {
            return err
        })
}
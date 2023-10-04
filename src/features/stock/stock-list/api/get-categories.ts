import type { ApiResponse, StockCategory } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"

// apiよりstocksを取得する
export const getCategories = async (userId: number): Promise<StockCategory[]> => {
    return await axiosInstance.get<ApiResponse<StockCategory>>("/categories", { params: { userId }})
        .then(res => {
            return res.data.results
        })
        .catch(err => {
            return err
        })
}
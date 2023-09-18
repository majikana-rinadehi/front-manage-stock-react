import type { ApiResponse, StockCreate } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"

export const createStock = async (stock: StockCreate): Promise<StockCreate[]> => {
    return await axiosInstance.post<ApiResponse<StockCreate>>(`/stocks`, stock)
        .then(_ => {
        })
        .catch(err => {
            return err
        })
}
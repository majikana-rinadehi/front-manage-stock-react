import type { ApiResponse, Stock } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"

export const updateStock = async (id: number, stock: Stock): Promise<Stock[]> => {
    return await axiosInstance.put<ApiResponse<Stock>>(`/stocks/${id}`, stock)
        .then(_ => {
        })
        .catch(err => {
            return err
        })
}
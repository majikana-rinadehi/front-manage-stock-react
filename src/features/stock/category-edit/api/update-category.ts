import type { ApiResponse, StockCategory } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"

export const updateCategory = async (id: number, category: StockCategory): Promise<StockCategory[]> => {
    return await axiosInstance.put<ApiResponse<StockCategory>>(`/categories/${id}`, category)
        .then(_ => {
        })
        .catch(err => {
            return err
        })
}
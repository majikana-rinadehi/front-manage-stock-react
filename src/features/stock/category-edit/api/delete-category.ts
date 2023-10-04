import type { ApiResponse, StockCategory } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"

export const deleteCategory = async (categoryId: number): Promise<void> => {
    return await axiosInstance.delete<ApiResponse<StockCategory>>(`/categories/${categoryId}`)
        .then(_ => {
            // DELETE method returns nothing
        })
        .catch(err => {
            return err
        })
}
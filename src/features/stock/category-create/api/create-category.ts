import type { ApiResponse, StockCategory, StockCategoryCreate } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"

export const createCategory = async (category: StockCategoryCreate): Promise<StockCategory[]> => {
    return await axiosInstance.post<ApiResponse<StockCategory>>(`/categories`, category)
        .then(res => {
            res.data.results
        })
        .catch(err => {
            return err
        })
}
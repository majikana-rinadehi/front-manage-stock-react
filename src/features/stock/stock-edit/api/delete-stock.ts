import type { ApiResponse, Stock } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"

export const deleteStock = async (id: number): Promise<Stock[]> => {
    return await axiosInstance.delete<ApiResponse<Stock>>(`/stocks/${id}`)
        .then(_ => {
            // DELETE method returns nothing
        })
        .catch(err => {
            return err
        })
}
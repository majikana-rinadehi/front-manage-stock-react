import type { ApiResponse, Stock } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"

// apiより、ログイン中のユーザIDに紐づくstocksを取得する
export const getStocks = async (userId: number): Promise<Stock[]> => {
    console.log('userId', userId)
    return await axiosInstance.get<ApiResponse<Stock>>("/stocks", { params: { userId: userId } })
        .then(res => {
            return res.data.results
        })
        .catch(err => {
            return err
        })
}
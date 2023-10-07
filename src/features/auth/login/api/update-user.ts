import type { ApiResponse } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"
import { User } from "../type/types"

export const updateUser = async (id: number, user: User): Promise<User> => {
    return await axiosInstance.put<ApiResponse<User>>(`/users/${id}`, user)
        .then(_ => {
        })
        .catch(err => {
            return err
        })
}
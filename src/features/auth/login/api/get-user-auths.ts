import type { ApiResponse } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"
import { UserAuth } from "../type/types"

export const getUserAuths = async (params: UserAuth): Promise<UserAuth[]> => {
    return await axiosInstance.get<ApiResponse<UserAuth>>(`/user-auths`, { params })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        })
}
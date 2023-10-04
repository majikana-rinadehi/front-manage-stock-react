import type { ApiResponse } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"
import { UserAuth, User } from "../type/types"

export const postSigninWithProviders = async (params: UserAuth): Promise<User> => {
    const req: UserAuth = {
        userId: params.userId,
        authProvider: params.authProvider,
        uid: params.uid
    }
    return await axiosInstance.post<ApiResponse<User>>(`/auth/signin`, req)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        })
}
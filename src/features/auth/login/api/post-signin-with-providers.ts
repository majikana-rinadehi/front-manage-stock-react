import type { ApiResponse } from "@/features/stock"
import { axiosInstance } from "@/lib/axios"
import { UserAuth } from "./user-auth"

export const postSigninWithProviders = async (params: UserAuth): Promise<UserAuth[]> => {
    const req: UserAuth = {
        userId: params.userId,
        authProvider: params.authProvider,
        uid: params.uid
    }
    return await axiosInstance.post<ApiResponse<UserAuth>>(`/auth/signin`, req)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        })
}
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppState } from "@/lib/store"
import { User } from "../type/types"

type UserState = {
    user: {
        data: User | null,
    },
}

const initialState: UserState = {
    user: {
        data: null,
    },
}

export const userSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.user.data = action.payload.user.data
        }
    },
})

export const {
    setUser
} = userSlice.actions

export default userSlice.reducer

export const userSelector = (state: AppState) => state.user.user.data
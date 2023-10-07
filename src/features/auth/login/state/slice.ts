import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppState } from "@/lib/store"
import { User } from "../type/types"
import { updateUser } from "../api/update-user"

type UserState = {
    user: {
        data: User | null,
        status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    },
}

const initialState: UserState = {
    user: {
        data: null,
        status: 'idle'
    },
}

export const editUser = createAsyncThunk(
    'user/update',
    async ({ id, user }: { id: number, user: User }) => {
        await updateUser(id, user)
        return user
    }
)

export const userSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user.data = action.payload.user.data
        }
    },
    extraReducers(builder) {
        builder
            // editUser
            .addCase(editUser.pending, (state, _) => {
                state.user.status = 'pending'
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.user.data = action.payload
                state.user.status = 'fulfilled'
            })
            .addCase(editUser.rejected, (state, _) => {
                state.user.status = 'rejected'
            })
    }
})

export const {
    setUser
} = userSlice.actions

export default userSlice.reducer

export const userSelector = (state: AppState) => state.user.user.data
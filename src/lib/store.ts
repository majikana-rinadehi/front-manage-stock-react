import stockReducer from "@/features/stock/stock-list/state/slice";
import userReducer from "@/features/auth/login/state/slice";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        stock: stockReducer,
        user: userReducer
    }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>
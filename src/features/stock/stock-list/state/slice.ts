import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppState } from "@/lib/store"
import { getStocks, type Stock, type StockCategory } from "@/features/stock"
import { getCategories } from "../api/get-categories"

type StockState = {
    stock: {
        data: Stock[],
        status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
        error: null
    },
    category: {
        data: StockCategory[],
        status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
        error: null
    }
}

const initialState: StockState = {
    stock: {
        data: [],
        status: 'idle',
        error: null
    },
    category: {
        data: [],
        status: 'idle',
        error: null
    },
}

export const fetchStock = createAsyncThunk(
    'stock/fetch',
    async () => {
        return await getStocks()
    }
)

export const fetchCategory = createAsyncThunk(
    'category/fetch',
    async () => {
        return await getCategories()
    }
)

export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchStock.pending, (state, _) => {
                state.stock.status = 'pending'
            })
            .addCase(fetchStock.fulfilled, (state, action) => {
                state.stock.data = action.payload
                state.stock.status = 'fulfilled'
            })
            .addCase(fetchStock.rejected, (state, _) => {
                state.stock.status = 'rejected'
            })
            .addCase(fetchCategory.pending, (state, _) => {
                state.category.status = 'pending'
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.category.data = action.payload
                state.category.status = 'fulfilled'
            })
            .addCase(fetchCategory.rejected, (state, _) => {
                state.category.status = 'rejected'
            })
    }
})

export const {
} = stockSlice.actions

export default stockSlice.reducer

export const stockSelector = (state: AppState) => state.stock.stock.data
export const categorySelector = (state: AppState) => state.stock.category.data
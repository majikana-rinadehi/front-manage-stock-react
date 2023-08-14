import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import { AppState } from "@/lib/store"
import { getStocks, type Stock, type StockCategory, type StockCreate } from "@/features/stock"
import { getCategories } from "../api/get-categories"
import { deleteStock } from "../../stock-edit/api/delete-stock"
import { updateStock } from "../../stock-edit/api/update-stock"
import { getFormattedTimeStamp } from "@/utils/format"
import { createStock } from "../../stock-create/api/create-stock"

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

export const removeStock = createAsyncThunk(
    'stock/delete',
    async (id: number) => {
        return await deleteStock(id)
    }
)

export const editStock = createAsyncThunk(
    'stock/update',
    // async(id: number, stock: Stock) => {
    async({id, stock}: {id: number, stock: Stock}) => {
        return await updateStock(id, stock)
    }
)

export const addStock = createAsyncThunk(
    'stock/create',
    async({stock}: {stock: StockCreate}) => {
        return await createStock(stock)
    }
)

export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            // fetchStock
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
            // editStock
            .addCase(editStock.pending, (state, _) => {
                state.stock.status = 'pending'
            })
            .addCase(editStock.fulfilled, (state, action) => {
                state.stock.status = 'fulfilled'
            })
            .addCase(editStock.rejected, (state, _) => {
                state.stock.status = 'rejected'
            })
            // removeStock
            .addCase(removeStock.pending, (state, _) => {
                state.stock.status = 'pending'
            })
            .addCase(removeStock.fulfilled, (state, _) => {
                state.stock.status = 'fulfilled'
            })
            .addCase(removeStock.rejected, (state, _) => {
                state.stock.status = 'rejected'
            })
            // addStock
            .addCase(addStock.pending, (state, _) => {
                state.stock.status = 'pending'
            })
            .addCase(addStock.fulfilled, (state, _) => {
                state.stock.status = 'fulfilled'
            })
            .addCase(addStock.rejected, (state, _) => {
                state.stock.status = 'rejected'
            })
            // fetchCategory
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

export const stockWithIsExpiredSelector = createSelector(
    stockSelector,
    (stocks) => {
        return stocks.map(stock => ({
            ...stock,
            expireDate: stock.expireDate ? getFormattedTimeStamp(stock.expireDate, 'yyyy-MM-dd') : stock.expireDate,
            isExpired: stock.expireDate ? new Date(stock.expireDate) < new Date() : false
        }))
    }
)

export const categoryWithHasExpiredStockSelector = createSelector(
    stockWithIsExpiredSelector,
    categorySelector,
    (stocks, categories) => {
        return categories.map(category => ({
            ...category,
            hasExpiredStock: stocks.findIndex(stock => { return stock.categoryId === category.id && stock.isExpired}) !== -1
        }))
    }
)

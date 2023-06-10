import { Stock, StockCategory } from "@/features/stock/type"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

const mock = new MockAdapter(axiosInstance)

// 下記に指定したAPIのみモック化する
mock.onGet("/api/stocks").reply<Stock[]>(200, [
    {
        "id": 1,
        "categoryId": 2,
        "name": "塩",
        "amount": 70,
        "isExpired": false,
        "expireDate": "2023/05/30"
    },
    {
        "id": 2,
        "categoryId": 2,
        "name": "みりん",
        "amount": 10,
        "isExpired": true
    },
    {
        "id": 3,
        "categoryId": 2,
        "name": "めんつゆ",
        "amount": 10,
        "isExpired": true
    },
    {
        "id": 4,
        "categoryId": 2,
        "name": "料理酒",
        "amount": 80,
        "isExpired": false,
        "expireDate": "2023/05/31"
    },
    {
        "id": 5,
        "categoryId": 2,
        "name": "酢",
        "amount": 100,
        "isExpired": false,
        "expireDate": "2023/06/01"
    },
    {
        "id": 6,
        "categoryId": 1,
        "name": "きゅうり",
        "amount": 100,
        "isExpired": false,
        "expireDate": "2023/06/01"
    },
    {
        "id": 7,
        "categoryId": 1,
        "name": "のり",
        "amount": 100,
        "isExpired": false,
        "expireDate": "2023/06/01"
    },
    {
        "id": 8,
        "categoryId": 3,
        "name": "スポンジ",
        "amount": 100,
        "isExpired": false,
        "expireDate": "2023/06/01"
    },
])

mock.onGet("/api/categories").reply<StockCategory[]>(200, [
    {
        id: 1,
        name: "食材",
        hasExpiredStock: true,
    },
    {
        id: 2,
        name: "調味料",
        hasExpiredStock: true,
    },
    {
        id: 3,
        name: "消耗品",
        hasExpiredStock: false,
    },
])

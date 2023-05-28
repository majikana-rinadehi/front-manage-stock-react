import { StockList } from "@/features/stock"
import { Layout } from "@/features/ui"
import { RouteObject, useRoutes, Outlet } from "react-router-dom"

const App = () => {
    return (
        <Layout>
            <Outlet/>
        </Layout>
    )
}

export const AppRoutes = () => {
    const routes: RouteObject[] = [
        {
            path: "/app",
            element: <App/>,
            children: [
                { path: "stockList", element: <StockList/>}
            ]
        }
    ]

    const element = useRoutes([...routes])

    return (
        <>{element}</>
    )
}
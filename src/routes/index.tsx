import { useGoogleAuth } from "@/features/auth/login/hooks/useGoogleAuth"
import { Login } from "@/features/auth/login/routes/login"
import { StockList } from "@/features/stock"
import { Layout } from "@/features/ui"
import { RouteObject, useRoutes, Outlet, Navigate } from "react-router-dom"

const App = () => {
    return (
        <Layout>
            <Outlet/>
        </Layout>
    )
}

export const AppRoutes = () => {

    const {user} = useGoogleAuth()

    const routes: RouteObject[] = [
        {
            path: "/app",
            element: user ? <App/> : <Navigate to={'/login'}/>,
            children: [
                { path: "stockList", element: <StockList/>}
            ]
        },
        {
            path: "/login",
            element: <App/>,
            children: [
                { path: "", element: <Login/>}
            ]
        },
        {
            path: "/*",
            element: <Navigate to={'/login'}/>,
            children: [
                { path: "", element: <Login/>}
            ]
        },
    ]

    const element = useRoutes([...routes])

    return (
        <>{element}</>
    )
}
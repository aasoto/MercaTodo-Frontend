import { Route, Routes } from "react-router-dom"
import { Routes as RoutesComponent } from './Routes';
import { LoginPage, Navbar, RegisterPage, ShowProductPage, ShowcasePage } from "../ui"
import { PrivateRoute, PublicRoute } from "../middlewares";

export const AppRouter = () => {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path="/" element={
                <ShowcasePage />
            }/>
            
            <Route path="product/:slug" element={
                <ShowProductPage />
            } />
            <Route path="login" element={
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>
            }/>
            <Route path="register" element={
                <PublicRoute>
                    <RegisterPage />
                </PublicRoute>
            }/>
            <Route path="/*" element={
                <PrivateRoute>
                    <RoutesComponent />
                </PrivateRoute>
            }/>
        </Routes>
    </>
  )
}

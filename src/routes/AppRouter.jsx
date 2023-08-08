import { Navigate, Route, Routes } from "react-router-dom"
import { PublicRoute } from "./PublicRoute"
import { LoginPage, Navbar, RegisterPage, ShowcasePage } from "../ui"

export const AppRouter = () => {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path="/" element={
                <ShowcasePage />
            }/>
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
                <Navigate to={'/'}/>
            }/>
        </Routes>
    </>
  )
}

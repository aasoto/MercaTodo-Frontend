import { Routes as ReactRouterDOMRoutes, Route } from "react-router-dom"
import { CartPage, OrdersPage, ProductsPage, ReportsPage, ShowcasePage, UsersPage } from "../ui";
import { HasRole } from "../middlewares";

export const Routes = () => {
    return (
        <ReactRouterDOMRoutes>
            <Route path="users" element={
                <HasRole name={'admin'}>
                    <UsersPage />
                </HasRole>
            } />
            <Route path="products" element={
                <HasRole name={'admin'}>
                    <ProductsPage />
                </HasRole>
            } />
            <Route path="reports" element={
                <HasRole name={'admin'}>
                    <ReportsPage />
                </HasRole>
            } />
            <Route path="showcase" element={
                <HasRole name={'client'}>
                    <ShowcasePage />
                </HasRole>
            } />
            <Route path="orders" element={
                <HasRole name={'client'}>
                    <OrdersPage />
                </HasRole>
            }/>
            <Route path="cart" element={
                <HasRole name={'client'}>
                    <CartPage />
                </HasRole>
            }/>
        </ReactRouterDOMRoutes>
    );
}

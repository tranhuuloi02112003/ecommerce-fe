import HomePage from "../pages/Home/Home";
import NotFoundPage from "../pages/NotFound";
import { Login, SignUp } from "../pages/Auth";
import WishList from "../pages/WishList";
import routes from "../config/routes";
import type { ComponentType, ReactNode } from "react";
import AdminLayout from "../layouts/AdminLayout";
import ProductsList from "@/pages/Admin/ProductsList/ProductsList";
import AddProduct from "@/pages/Admin/AddProduct/AddProduct ";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  layout?: ComponentType<{ children: ReactNode }> | null;
}

const publicRoutes: RouteConfig[] = [
  {
    path: routes.home,
    element: <HomePage />,
  },
  {
    path: routes.login,
    element: <Login />,
  },
  {
    path: routes.signUp,
    element: <SignUp />,
  },
  {
    path: routes.wishlist,
    element: <WishList />,
  },
  {
    path: routes.notFound,
    element: <NotFoundPage />,
    layout: null,
  },
];

const adminRoutes: RouteConfig[] = [
  {
    path: routes.ADMIN_HOME,
    element: <div>Dashboard</div>,
    layout: AdminLayout,
  },
  {
    path: routes.ADMIN_ORDERS,
    element: <div>Orders</div>,
    layout: AdminLayout,
  },
  {
    path: routes.ADMIN_PRODUCTS,
    element: <ProductsList />,
    layout: AdminLayout,
  },
  {
    path: routes.ADMIN_ADD_PRODUCT,
    element: <AddProduct />,
    layout: AdminLayout,
  },
];

export { publicRoutes, adminRoutes };

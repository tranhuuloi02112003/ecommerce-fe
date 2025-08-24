import HomePage from "../pages/Home";
import CartPage from "../pages/Cart";
import ProfilePage from "../pages/Profile";
import NotFoundPage from "../pages/NotFound";
import routes from "../config/routes";
import type { ComponentType, ReactNode } from "react";
import Products from "../pages/Products";

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
    path: routes.cart,
    element: <CartPage />,
  },
  {
    path: routes.profile,
    element: <ProfilePage />,
  },
  {
    path: routes.products,
    element: <Products />,
  },
  {
    path: routes.notFound,
    element: <NotFoundPage />,
    layout: null,
  },
];

export { publicRoutes };

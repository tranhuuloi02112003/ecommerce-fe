import HomePage from "../pages/Home/Home";
import NotFoundPage from "../pages/NotFound";
import { Login, SignUp } from "../pages/Auth";
import WishList from "../pages/WishList";
import routes from "../config/routes";
import type { ComponentType, ReactNode } from "react";

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

export { publicRoutes };

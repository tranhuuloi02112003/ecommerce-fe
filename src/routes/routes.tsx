import HomePage from "../pages/Home/Home";
import NotFoundPage from "../pages/NotFound";
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
    path: routes.notFound,
    element: <NotFoundPage />,
    layout: null,
  },
];

export { publicRoutes };

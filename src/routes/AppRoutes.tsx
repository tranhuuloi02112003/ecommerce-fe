import { Fragment } from "react";
import type { RouteObject } from "react-router-dom";
import type { ComponentType, ReactNode } from "react";
import { publicRoutes } from "./router";
import MainLayout from "../layouts/MainLayout";

type LayoutType = ComponentType<{ children: ReactNode }> | null;

const RouteWithLayout = ({
  element,
  layout,
}: {
  element: ReactNode;
  layout?: LayoutType;
}) => {
  // Nếu layout = undefined => dùng MainLayout
  // Nếu layout = null => dùng Fragment
  const Layout = layout === undefined ? MainLayout : layout || Fragment;
  return <Layout>{element}</Layout>;
};

// Tạo danh sách route object cho react-router
const AppRoutes = (): RouteObject[] => {
  return publicRoutes.map((route) => ({
    ...route,
    element: (
      <RouteWithLayout element={route.element} layout={route.layout} />
    ),
  }));
};

export default AppRoutes;

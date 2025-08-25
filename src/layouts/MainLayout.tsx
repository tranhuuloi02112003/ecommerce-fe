import type { ReactNode } from "react";
import Header from "./MainLayout/Header";
import Footer from "./MainLayout/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;

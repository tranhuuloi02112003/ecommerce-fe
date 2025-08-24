import type { ReactNode } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;

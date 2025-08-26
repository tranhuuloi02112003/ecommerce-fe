import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Hero } from "./Hero";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <Hero />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
}

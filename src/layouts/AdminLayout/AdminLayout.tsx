import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen">
          <AdminHeader />
            <main className="p-6 bg-[#E7E7E3]">
              {children}
            </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

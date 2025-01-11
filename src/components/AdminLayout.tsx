import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSideBar";
import Footer from "./Footer";

const AdminLayout = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden">
      <div className="w-full h-full flex flex-row">
        <AdminSidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;

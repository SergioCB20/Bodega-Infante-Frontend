import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSideBar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const { userInfo } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.pathname.includes(`/dashboard/${userInfo?.id}`)) {
    navigate(`/`);
  }

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

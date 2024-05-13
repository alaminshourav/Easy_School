import { Outlet } from "react-router-dom";
import Footer from "../components/shared/footer/Footer";
import AdminSidebar from "../dashboard/sideAdmin/adminSidebar/AdminSidebar";
import DashboardMenu from "../components/shared/DashboardMenu/DashboardMenu";

const AdminLayout = () => {
  return (
    <div>
      <DashboardMenu />
      <AdminSidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminLayout;

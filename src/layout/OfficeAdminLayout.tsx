import { Outlet } from "react-router-dom";
import Footer from "../components/shared/footer/Footer";
import DashboardMenu from "../components/shared/DashboardMenu/DashboardMenu";
import OfficeAdminSidebar from "../dashboard/officeAdminDashboard/officeAdminSidebar/OfficeAdminSidebar";

const OfficeAdminLayout = () => {
  return (
    <div>
      <DashboardMenu />
      <OfficeAdminSidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default OfficeAdminLayout;

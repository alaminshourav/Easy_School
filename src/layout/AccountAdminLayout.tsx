import { Outlet } from "react-router-dom";
import Footer from "../components/shared/footer/Footer";
import DashboardMenu from "../components/shared/DashboardMenu/DashboardMenu";
import AccountAdminSidebar from "../dashboard/accountDashboard/accountSidebar/AccountSidebar";

const AccountAdminLayout = () => {
  return (
    <div>
      <DashboardMenu />
      <AccountAdminSidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AccountAdminLayout;

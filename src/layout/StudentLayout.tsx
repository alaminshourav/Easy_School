import { Outlet } from "react-router-dom";
import Footer from "../components/shared/footer/Footer";
import DashboardMenu from "../components/shared/DashboardMenu/DashboardMenu";
import StudentSidebar from "../dashboard/studentDashboard/studentSidebar/StudentSidebar";

const StudentLayout = () => {
  return (
    <div>
      <DashboardMenu />
      <StudentSidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default StudentLayout;

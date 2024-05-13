import { Outlet } from "react-router-dom";
import Footer from "../components/shared/footer/Footer";
import DashboardMenu from "../components/shared/DashboardMenu/DashboardMenu";
import TeacherSidebar from "../dashboard/teacherDashboard/teacherSidebar/TeacherSidebar";

const TeacherLayout = () => {
  return (
    <div>
      <DashboardMenu />
      <TeacherSidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default TeacherLayout;

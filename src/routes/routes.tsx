import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home/Home";
import MainLayout from "../layout/MainLayout";
import Festival from "../pages/festival/Festival";
import Contact from "../pages/contact/Contact";
import About from "../pages/about/About";
import Administrator from "../pages/administrator/Administrator";
import BookList from "../pages/bookList/BookList";
import ClassRouting from "../pages/classRouting/ClassRouting";
import DressCode from "../pages/dressCode/DressCode";
import ExamRouting from "../pages/examRouting/ExamRouting";
import OtherEmployee from "../pages/otherEmployee/OtherEmployee";
import Syllabus from "../pages/syllabus/Syllabus";
import Teacher from "../pages/Teacher/Teacher";
import Login from "../pages/auth/login/Login";
import AdminLayout from "../layout/AdminLayout";
import AddBookList from "../dashboard/sideAdmin/adminBookList/addBookList/AddBookList";
import EditBookList from "../dashboard/sideAdmin/adminBookList/editBookList/EditBookList";
import AdminBookList from "../dashboard/sideAdmin/adminBookList/AdminBookList";
import Setting from "../dashboard/sideAdmin/setting/Setting";
import GeneralSection from "../dashboard/sideAdmin/generalSection/GeneralSection";
import Profile from "../dashboard/sideAdmin/profile/Profile";

import Role from "../dashboard/sideAdmin/setting/Role/Role";
import EditRole from "../dashboard/sideAdmin/setting/Role/editRole/EditRole";
import Registration from "../dashboard/sideAdmin/generalSection/Registration/Registration";
import TeacherSetting from "../dashboard/sideAdmin/setting/teacherSetting/TeacherSetting";
import EditStudent from "../dashboard/sideAdmin/generalSection/Registration/editRegistration/EditStudent";
import EditTeacher from "../dashboard/sideAdmin/generalSection/Registration/editRegistration/EditTeacher";
import StudentClass from "../dashboard/sideAdmin/setting/studentClass/StudentClass";
import AddClass from "../dashboard/sideAdmin/setting/studentClass/addClass/AddClass";
import AddSubject from "../dashboard/sideAdmin/setting/studentClass/addSubject/AddSubject";
import EditClass from "../dashboard/sideAdmin/setting/studentClass/editClass/EditClass";
import FeeCollection from "../dashboard/sideAdmin/feeCollection/FeeCollection";
import AddFee from "../dashboard/sideAdmin/feeCollection/addFee/AddFee";
import TeacherLayout from "../layout/TeacherLayout";
import MyClass from "../dashboard/teacherDashboard/myClass/MyClass";
import TeacherMark from "../dashboard/teacherDashboard/teacherMark/TeacherMark";
import AddMark from "../dashboard/teacherDashboard/teacherMark/AddMark";
import OfficeAdminLayout from "../layout/OfficeAdminLayout";
import DashboardClassRouting from "../dashboard/officeAdminDashboard/classRouting/DashboardClassRouting";
import AddClassRouting from "../dashboard/officeAdminDashboard/classRouting/addClassRouting/AddClassRouting";
import EditClassRouting from "../dashboard/officeAdminDashboard/classRouting/editClassRouting/EditClassRouting";
import DashboardExamRouting from "../dashboard/officeAdminDashboard/examRouting/DashboardExamRouting";
import AddExamRouting from "../dashboard/officeAdminDashboard/examRouting/addExamRouting/AddExamRouting";
import EditExamRouting from "../dashboard/officeAdminDashboard/examRouting/editExamRouting/EditExamRouting";
import DashboardNotice from "../dashboard/officeAdminDashboard/notice/DashboardNotice";
import AddNotice from "../dashboard/officeAdminDashboard/notice/addNotice/AddNotice";
import EditNotice from "../dashboard/officeAdminDashboard/notice/editNotice/EditNotice";
import DashboardSyllabus from "../dashboard/officeAdminDashboard/syllabus/DashboardSyllabus";
import AddSyllabus from "../dashboard/officeAdminDashboard/syllabus/addSyllabus/AddSyllabus";
import EditSyllabus from "../dashboard/officeAdminDashboard/syllabus/editSyllabus/EditSyllabus";
import AdminLogin from "../pages/auth/login/AdminLogin";
import AdminPrivateRoute from "../privateRoute/AdminPrivateRoute";
import TeacherPrivateRoute from "../privateRoute/TeacherPrivateRoute";
import OfficeAdminPrivateRoute from "../privateRoute/OfficeAdminPrivateRoute";
import StudentLayout from "../layout/StudentLayout";
import Result from "../dashboard/studentDashboard/result/Result";
import ResultPublish from "../dashboard/sideAdmin/setting/publishResult/PublishResult";
import SideAdminMain from "../dashboard/sideAdmin/sideAdminMain/SideAdminMain";
import Testimonial from "../dashboard/sideAdmin/setting/testimonial/Testimonial";
import Certificate from "../dashboard/sideAdmin/setting/certificate/Certificate";
import OfficeAdminProfile from "../dashboard/officeAdminDashboard/officeAdminProfile/OfficeAdminProfile";
import TeacherProfile from "../dashboard/teacherDashboard/teacherProfile/TeacherProfile";
import StudentProfile from "../dashboard/studentDashboard/studentProfile/StudentProfile";
import FeeCollectionMain from "../dashboard/sideAdmin/feeCollection/FeeCollectionMain";
import AddStudent from "../dashboard/sideAdmin/generalSection/Registration/addRegistration/AddStudent";
import AddEmployee from "../dashboard/sideAdmin/generalSection/Registration/addRegistration/AddEmployee";
import AccountAdminPrivateRoute from "../privateRoute/AccountAdminPrivateRoute";
import AccountAdminLayout from "../layout/AccountAdminLayout";
import AccountProfile from "../dashboard/accountDashboard/accountProfile/AccountProfile";
import DashboardFestival from "../dashboard/officeAdminDashboard/festival/DashboardFestival";
import AddFestival from "../dashboard/officeAdminDashboard/festival/addFestival/AddFestival";
import EditFestival from "../dashboard/officeAdminDashboard/festival/editFestival/EditFestival";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/festival",
        element: <Festival />,
      },
      {
        path: "/administrator",
        element: <Administrator />,
      },
      {
        path: "/book-list",
        element: <BookList />,
      },
      {
        path: "/class-routing",
        element: <ClassRouting />,
      },
      {
        path: "/dress-code",
        element: <DressCode />,
      },
      {
        path: "/exam-routing",
        element: <ExamRouting />,
      },
      {
        path: "/others-employee",
        element: <OtherEmployee />,
      },
      {
        path: "/syllabus",
        element: <Syllabus />,
      },
      {
        path: "/teachers",
        element: <Teacher />,
      },
      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/admin/sign-in",
        element: <AdminLogin />,
      },
    ],
  },

  /* supper admin */
  {
    path: "/site-admin",
    element: (
      <AdminPrivateRoute>
        <AdminLayout />
      </AdminPrivateRoute>
    ),
    children: [
      {
        path: "/site-admin",
        element: <SideAdminMain />,
      },
      {
        path: "/site-admin/book-list",
        element: <AdminBookList />,
      },
      {
        path: "/site-admin/add-book-list",
        element: <AddBookList />,
      },
      {
        path: "/site-admin/edit-book-list/:id",
        element: <EditBookList />,
      },
      {
        path: "/site-admin/setting",
        element: <Setting />,
      },
      {
        path: "/site-admin/general-section",
        element: <GeneralSection />,
      },
      {
        path: "/site-admin/profile",
        element: <Profile />,
      },
      {
        path: "/site-admin/student-class",
        element: <StudentClass />,
      },
      {
        path: "/site-admin/add-class",
        element: <AddClass />,
      },
      {
        path: "/site-admin/add-subject/:id",
        element: <AddSubject />,
      },
      {
        path: "/site-admin/edit-class/:id",
        element: <EditClass />,
      },
      {
        path: "/site-admin/role",
        element: <Role />,
      },
      {
        path: "/site-admin/edit-role",
        element: <EditRole />,
      },
      {
        path: "/site-admin/registration",
        element: <Registration />,
      },
      {
        path: "/site-admin/add-student",
        element: <AddStudent />,
      },
      {
        path: "/site-admin/add-employee",
        element: <AddEmployee />,
      },
      {
        path: "/site-admin/edit-student/:id",
        element: <EditStudent />,
      },
      {
        path: "/site-admin/edit-teacher/:id",
        element: <EditTeacher />,
      },
      {
        path: "/site-admin/teacher-setting",
        element: <TeacherSetting />,
      },
      {
        path: "/site-admin/fee-collection",
        element: <FeeCollectionMain />,
      },
      {
        path: "/site-admin/pay-fee",
        element: <FeeCollection />,
      },
      {
        path: "/site-admin/add-fee",
        element: <AddFee />,
      },
      {
        path: "/site-admin/result-publish",
        element: <ResultPublish />,
      },
      {
        path: "/site-admin/testimonial",
        element: <Testimonial />,
      },
      {
        path: "/site-admin/certificate",
        element: <Certificate />,
      },
    ],
  },
  /* teacher */
  {
    path: "/teacher-dashboard",
    element: (
      <TeacherPrivateRoute>
        <TeacherLayout />
      </TeacherPrivateRoute>
    ),
    children: [
      {
        path: "/teacher-dashboard",
        element: <TeacherProfile />,
      },
      {
        path: "/teacher-dashboard/my-class",
        element: <MyClass />,
      },
      {
        path: "/teacher-dashboard/teacher-mark/:id",
        element: <TeacherMark />,
      },
      {
        path: "/teacher-dashboard/add-mark/:id",
        element: <AddMark />,
      },
      {
        path: "/teacher-dashboard/profile",
        element: <TeacherProfile />,
      },
    ],
  },
  /* office admin */
  {
    path: "/office-admin",
    element: (
      <OfficeAdminPrivateRoute>
        <OfficeAdminLayout />
      </OfficeAdminPrivateRoute>
    ),
    children: [
      {
        path: "/office-admin",
        element: <Registration />,
      },
      {
        path: "/office-admin/registration",
        element: <Registration />,
      },
      {
        path: "/office-admin/add-student",
        element: <AddStudent />,
      },
      {
        path: "/office-admin/add-employee",
        element: <AddEmployee />,
      },
      {
        path: "/office-admin/edit-student/:id",
        element: <EditStudent />,
      },
      {
        path: "/office-admin/book-list",
        element: <AdminBookList />,
      },
      {
        path: "/office-admin/add-book-list",
        element: <AddBookList />,
      },
      {
        path: "/office-admin/edit-book-list/:id",
        element: <EditBookList />,
      },
      {
        path: "/office-admin/class-routing",
        element: <DashboardClassRouting />,
      },
      {
        path: "/office-admin/add-class-routing",
        element: <AddClassRouting />,
      },
      {
        path: "/office-admin/edit-class-routing/:id",
        element: <EditClassRouting />,
      },
      {
        path: "/office-admin/exam-routing",
        element: <DashboardExamRouting />,
      },
      {
        path: "/office-admin/add-exam-routing",
        element: <AddExamRouting />,
      },
      {
        path: "/office-admin/edit-exam-routing/:id",
        element: <EditExamRouting />,
      },
      {
        path: "/office-admin/notice",
        element: <DashboardNotice />,
      },
      {
        path: "/office-admin/add-notice",
        element: <AddNotice />,
      },
      {
        path: "/office-admin/edit-notice/:id",
        element: <EditNotice />,
      },
      {
        path: "/office-admin/festival",
        element: <DashboardFestival />,
      },
      {
        path: "/office-admin/add-festival",
        element: <AddFestival />,
      },
      {
        path: "/office-admin/edit-festival/:id",
        element: <EditFestival />,
      },
      {
        path: "/office-admin/syllabus",
        element: <DashboardSyllabus />,
      },
      {
        path: "/office-admin/add-syllabus",
        element: <AddSyllabus />,
      },
      {
        path: "/office-admin/edit-syllabus/:id",
        element: <EditSyllabus />,
      },
      {
        path: "/office-admin/profile",
        element: <OfficeAdminProfile />,
      },
    ],
  },
  /* account admin */
  {
    path: "/account-admin",
    element: (
      <AccountAdminPrivateRoute>
        <AccountAdminLayout />
      </AccountAdminPrivateRoute>
    ),
    children: [
      {
        path: "/account-admin",
        element: <SideAdminMain />,
      },
      {
        path: "/account-admin/fee-collection",
        element: <FeeCollectionMain />,
      },
      {
        path: "/account-admin/pay-fee",
        element: <FeeCollection />,
      },
      {
        path: "/account-admin/add-fee",
        element: <AddFee />,
      },
      {
        path: "/account-admin/profile",
        element: <AccountProfile />,
      },
    ],
  },
  /* student dashboard */
  {
    path: "/student-dashboard",
    element: <StudentLayout />,
    children: [
      {
        path: "/student-dashboard",
        element: <StudentProfile />,
      },

      {
        path: "/student-dashboard/student-result",
        element: <Result />,
      },
      {
        path: "/student-dashboard/profile",
        element: <StudentProfile />,
      },
    ],
  },
]);
export default router;

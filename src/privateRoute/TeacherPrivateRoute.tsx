import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/loader/Loader";

const TeacherPrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (user?.role === "teacher" || user?.role === "admin") {
    return children;
  }
  return (
    <Navigate
      to={"/admin/sign-in"}
      state={{ from: location }}
      replace
    ></Navigate>
  );
};

export default TeacherPrivateRoute;

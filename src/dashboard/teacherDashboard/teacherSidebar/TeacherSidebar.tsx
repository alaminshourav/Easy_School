import "../../sideAdmin/adminSidebar/adminSidebar.css";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ToggleContext } from "../../../context/ToggleContext";
import { AuthContext } from "../../../context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ClassIcon from "@mui/icons-material/Class";

const TeacherSidebar = () => {
  const { sidebarOpen } = useContext(ToggleContext)!;
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className={sidebarOpen ? "dashboardMain" : "display_none"}>
        <div className={sidebarOpen ? "sidebarBefore" : "sidebarAfter"}>
          <div className="userMenuItems">
            <div className="userProfile">
              <div>
                <h5>{user?.username}</h5>
                <p className="user_email">{user?.email}</p>
                <p
                  className="user_email"
                  style={{ padding: "5px 0", textTransform: "capitalize" }}
                >
                  <b> {user?.role} panel</b>
                </p>
              </div>
              <hr className="common_hr" />
            </div>
            <div className="adminDashboardMenu">
              <ul>
                <li>
                  <Link to={"/teacher-dashboard"}>
                    <span>
                      <DashboardIcon />
                    </span>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <NavLink
                    to={"/teacher-dashboard/my-class"}
                    className={({ isActive }) =>
                      isActive ? "nav_active" : "nav-link"
                    }
                  >
                    <span>
                      <ClassIcon />
                    </span>
                    My Class
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/teacher-dashboard/profile"}
                    className={({ isActive }) =>
                      isActive ? "nav_active" : "nav-link"
                    }
                  >
                    <span>
                      <AccountCircleIcon />
                    </span>
                    Profile
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;

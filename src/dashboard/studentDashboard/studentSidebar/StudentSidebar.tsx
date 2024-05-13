import { useContext } from "react";
import { ToggleContext } from "../../../context/ToggleContext";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CompressIcon from "@mui/icons-material/Compress";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const StudentSidebar = () => {
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
              </div>
              <hr className="common_hr" />
            </div>
            <div className="adminDashboardMenu">
              <ul>
                <li>
                  <Link to={"/student-dashboard"}>
                    <DashboardIcon />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <NavLink
                    to={"/student-dashboard/student-result"}
                    className={({ isActive }) =>
                      isActive ? "nav_active" : "nav-link"
                    }
                  >
                    <span>
                      <CompressIcon />
                    </span>
                    Result
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/student-dashboard/profile"}
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

export default StudentSidebar;

import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ToggleContext } from "../../../context/ToggleContext";
import { AuthContext } from "../../../context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCardIcon from "@mui/icons-material/AddCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const AccountAdminSidebar = () => {
  const { sidebarOpen } = useContext(ToggleContext)!;
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className={sidebarOpen ? "dashboardMain" : "display_none"}>
        <div className={sidebarOpen ? "sidebarBefore" : "sidebarAfter"}>
          <div className="userMenuItems">
            <div className="userProfile">
              <div className="user_dashboard_image">
                <img src={""} alt="" />
              </div>
              <div>
                <h5>{user?.username}</h5>
                <p className="user_email">{user?.email}</p>
                <p
                  className="user_email"
                  style={{ padding: "5px 0", textTransform: "capitalize" }}
                >
                  <b>{user?.role} panel</b>
                </p>
              </div>
              <hr className="common_hr" />
            </div>
            <div className="adminDashboardMenu">
              <ul>
                <li>
                  <Link to={"/account-admin"}>
                    <span>
                      <DashboardIcon />
                    </span>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <NavLink
                    to={"/account-admin/fee-collection"}
                    className={({ isActive }) =>
                      isActive ? "nav_active" : "nav-link"
                    }
                  >
                    <span>
                      <AddCardIcon />
                    </span>
                    Fee Collection
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/account-admin/profile"}
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

export default AccountAdminSidebar;

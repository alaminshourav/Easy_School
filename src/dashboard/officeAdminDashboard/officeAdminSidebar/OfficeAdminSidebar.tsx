import { useContext, useState } from "react";
import { ToggleContext } from "../../../context/ToggleContext";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const OfficeAdminSidebar = () => {
  const { sidebarOpen } = useContext(ToggleContext)!;
  const [openGnMenu, setOpenGnMenu] = useState(false);
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
                  <Link to={"/office-admin"}>
                    <span>
                      <DashboardIcon />
                    </span>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/office-admin"}
                    onClick={() => setOpenGnMenu((pre) => !pre)}
                  >
                    <span>
                      <AddBoxIcon />
                    </span>
                    General Section
                  </Link>
                </li>
                {openGnMenu && (
                  <div className="sub_menu" style={{ marginLeft: "15px" }}>
                    <li>
                      <NavLink
                        to={"/office-admin/registration"}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Registration
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/office-admin/add-student"}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Add Student
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/office-admin/add-employee"}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Add Employee
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/office-admin/festival"}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Festival
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/office-admin/book-list"}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Book list
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/office-admin/class-routing"}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Class routing
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/office-admin/exam-routing"}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Exam routing
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/office-admin/notice"}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Notice
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to={"/office-admin/syllabus"}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Syllabus
                      </NavLink>
                    </li>
                  </div>
                )}
                <li>
                  <NavLink
                    to={"/office-admin/profile"}
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

export default OfficeAdminSidebar;

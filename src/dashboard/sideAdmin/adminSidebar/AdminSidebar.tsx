import "./adminSidebar.css";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ToggleContext } from "../../../context/ToggleContext";
import { AuthContext } from "../../../context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddCardIcon from "@mui/icons-material/AddCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const AdminSidebar = () => {
  const { sidebarOpen } = useContext(ToggleContext)!;
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [openGnMenu, setOpenGnMenu] = useState(false);
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
                  <b> {user?.role} panel</b>
                </p>
              </div>
              <hr className="common_hr" />
            </div>
            <div className="adminDashboardMenu">
              <ul>
                <li>
                  <Link to={"/site-admin"}>
                    <span>
                      <DashboardIcon />
                    </span>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <NavLink
                    to={"/site-admin/student-class"}
                    onClick={() => setOpenSubMenu((pre) => !pre)}
                    className={({ isActive }) =>
                      isActive ? "nav_active" : "nav-link"
                    }
                  >
                    <span>
                      <SettingsIcon />
                    </span>
                    Setting
                  </NavLink>
                </li>
                {openSubMenu && (
                  <div className="sub_menu" style={{ marginLeft: "15px" }}>
                    <li>
                      <NavLink
                        to={"/site-admin/student-class"}
                        onClick={() => setOpenSubMenu(true)}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Class Setting
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/site-admin/teacher-setting"}
                        onClick={() => setOpenSubMenu(true)}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Class Schedule
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/site-admin/role"}
                        onClick={() => setOpenSubMenu(true)}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Role
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/site-admin/result-publish"}
                        onClick={() => setOpenSubMenu(true)}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Result Publish
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/site-admin/testimonial"}
                        onClick={() => setOpenSubMenu(true)}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Testimonial
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/site-admin/certificate"}
                        onClick={() => setOpenSubMenu(true)}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        TC
                      </NavLink>
                    </li>
                  </div>
                )}
                <li>
                  <NavLink
                    to={"/site-admin/registration"}
                    onClick={() => setOpenGnMenu((pre) => !pre)}
                    className={({ isActive }) =>
                      isActive ? "nav_active" : "nav-link"
                    }
                  >
                    <span>
                      <AddBoxIcon />
                    </span>
                    General Section
                  </NavLink>
                </li>
                {openGnMenu && (
                  <div className="sub_menu" style={{ marginLeft: "15px" }}>
                    <li>
                      <NavLink
                        to={"/site-admin/registration"}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Registration
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/site-admin/add-student"}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Add Student
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/site-admin/add-employee"}
                        className={({ isActive }) =>
                          isActive ? "nav_active" : "nav-link"
                        }
                      >
                        Add Employee
                      </NavLink>
                    </li>
                    {/* <li>
                      <Link to={"/site-admin/book-list"}>Book list</Link>
                    </li>
                    <li>
                      <Link to={"/site-admin/notice"}>Notice</Link>
                    </li>
                    <li>
                      <Link to={"/site-admin/class-routing"}>
                        Class routing
                      </Link>
                    </li>
                    <li>
                      <Link to={"/site-admin/exam-routing"}>Exam routing</Link>
                    </li>
                    <li>
                      <Link to={"/site-admin/syllabus"}>Syllabus</Link>
                    </li> */}
                  </div>
                )}
                <li>
                  <NavLink
                    to={"/site-admin/fee-collection"}
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
                    to={"/site-admin/profile"}
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

export default AdminSidebar;

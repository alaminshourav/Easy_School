import React, { useContext, useState } from "react";
import "./dashboardMenu.css";
import { Link, useNavigate } from "react-router-dom";
import { ToggleContext } from "../../../context/ToggleContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import image from "../../../assets/logo.jpeg";
import userImg from "../../../assets/user_img.jpg";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";

const DashboardMenu = () => {
  const { sidebarOpen, handleToggle } = useContext(ToggleContext)!;
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const employeeURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_TEACHER;
  const studentURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_STUDENT;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = () => {
    navigate("/dashboard/profile");
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const userPhoto = user?.photo
    ? user.role === "admin" ||
      user.role === "teacher" ||
      user.role === "office-admin" ||
      user.role === "account-admin"
      ? employeeURL + user.photo
      : studentURL + user.photo
    : userImg;
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#321d3e" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#2e6216",
          color: "#222",
          boxShadow: "none",
          position: "fixed",
          top: 0,
          zIndex: 5,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: "18px",
              fontWeight: "700",
              display: { xs: "none", sm: "block" },
            }}
          >
            <Link to={"/"} className="admin_dashboard_logo">
              <div className="logo">
                <img src={image} alt="" />
                <div>
                  <h5>Easy School</h5>{" "}
                  <span className="logo_subtitle">Work for light nation</span>
                </div>
              </div>
            </Link>
          </Typography>
          {sidebarOpen ? (
            <div className="mobile_icon_main">
              <IconButton
                edge="start"
                sx={{ color: "#fff" }}
                color="inherit"
                aria-label="menu"
                onClick={handleToggle}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ) : (
            <IconButton
              edge="start"
              sx={{ color: "#fff" }}
              color="inherit"
              aria-label="menu"
              onClick={handleToggle}
            >
              <MenuIcon />
            </IconButton>
          )}

          <div className="dashBoardMenu dashboardMenu">
            <Button sx={{ color: "#fff" }}>
              <Link to={"/"} style={{ color: "#fff" }}>
                Back to School
              </Link>
            </Button>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className="userIconNav"
            >
              {user?.photo && (
                <img src={userPhoto} alt="" className="userImg" />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClick}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DashboardMenu;

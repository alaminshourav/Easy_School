import "./Navbar.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AuthContext } from "../../../context/AuthContext";
import image from "../../../assets/logo.jpeg";
import useFetch from "../../../hooks/useFetch";
import { BookListProps } from "../../../types/BookListProps.type";
import userImg from "../../../assets/user_img.jpg";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
const drawerWidth = 300;

const Navbar = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [showBookDropDown, setShowBookDropDown] = React.useState(false);
  const [showClassDropDown, setShowClassDropDown] = React.useState(false);
  const [showExamDropDown, setShowExamDropDown] = React.useState(false);
  const [showSyllabusDropDown, setShowSyllabusDropDown] = React.useState(false);
  const [showAboutDropDown, setShowAboutDropDown] = React.useState(false);
  const { user, dispatch } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const { data: classRoutingData } = useFetch<BookListProps[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/class-routing`
  );
  const { data: bookData } = useFetch<BookListProps[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/book-list`
  );
  const { data: examData } = useFetch<BookListProps[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/exam-routing`
  );
  const { data: syllabusData } = useFetch<BookListProps[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/syllabus`
  );
  const userURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_STUDENT;
  const employeeURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_TEACHER;
  const bookURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_BOOK;
  const syllabusURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_SYLLABUS;
  const classRoutingURL = import.meta.env
    .VITE_REACT_APP_PUBLIC_FOLDER_CLASS_ROUTING;
  const examRoutingURL = import.meta.env
    .VITE_REACT_APP_PUBLIC_FOLDER_EXAM_ROUTING;
  const userPhoto = user?.photo
    ? user.role === "admin" ||
      user.role === "teacher" ||
      user.role === "office-admin" ||
      user.role === "account-admin"
      ? employeeURL + user.photo
      : userURL + user.photo
    : userImg;
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMouseEnter = (type: string) => {
    if (type === "student") {
      setShowDropDown(true);
    } else if (type === "about") {
      setShowAboutDropDown(true);
    }
  };

  const handleMouseLeave = (type: string) => {
    if (type === "student") {
      setShowDropDown(false);
    } else if (type === "about") {
      setShowAboutDropDown(false);
    }
  };

  const handleSubMouseEnter = (type: string) => {
    if (type === "book") {
      setShowBookDropDown(true);
    } else if (type === "class") {
      setShowClassDropDown(true);
    } else if (type === "exam") {
      setShowExamDropDown(true);
    } else if (type === "syllabus") {
      setShowSyllabusDropDown(true);
    }
  };

  const handleSubMouseLeave = (type: string) => {
    if (type === "book") {
      setShowBookDropDown(false);
    } else if (type === "class") {
      setShowClassDropDown(false);
    } else if (type === "exam") {
      setShowExamDropDown(false);
    } else if (type === "syllabus") {
      setShowSyllabusDropDown(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ display: "flex", flexDirection: "column" }}
      className="mobile_nav_container"
    >
      <Divider />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Button sx={{ color: "#fff" }}>
          <Link to={"/"}>Home</Link>
        </Button>
        <Button
          sx={{ color: "#fff" }}
          onMouseEnter={() => handleMouseEnter("student")}
          onMouseLeave={() => handleMouseLeave("student")}
          className="drop_down_main"
        >
          <Link to={"/"} className="drop_down_menu">
            Student corner <KeyboardArrowDownIcon />
          </Link>
          {showDropDown && (
            <Box className="drop_down_menu_item">
              <Link
                to={"/"}
                onMouseEnter={() => handleSubMouseEnter("book")}
                className="sub_drop_down_menu_item_main"
              >
                Book list
              </Link>
              {showBookDropDown && (
                <Box className="sub_drop_down_menu_item">
                  {bookData?.map((item: any) => (
                    <>
                      {item?.file && (
                        <a
                          href={bookURL + item.file}
                          download
                          onMouseLeave={() => handleSubMouseLeave("book")}
                        >
                          {item.className}
                        </a>
                      )}
                    </>
                  ))}
                </Box>
              )}
              <Link to={"/dress-code"}>Dress code</Link>
              <Link
                to={"/"}
                onMouseEnter={() => handleSubMouseEnter("syllabus")}
                className="sub_drop_down_menu_item_main"
              >
                Syllabus
              </Link>
              {showSyllabusDropDown && (
                <Box className="sub_drop_down_menu_item">
                  {syllabusData?.map((item: any) => (
                    <>
                      {item?.file && (
                        <a
                          href={syllabusURL + item.file}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseLeave={() => handleSubMouseLeave("syllabus")}
                        >
                          {item?.className}
                        </a>
                      )}
                    </>
                  ))}
                </Box>
              )}
              <Link
                to={"/"}
                onMouseEnter={() => handleSubMouseEnter("class")}
                className="sub_drop_down_menu_item_main"
              >
                Class routing
              </Link>
              {showClassDropDown && (
                <Box className="sub_drop_down_menu_item">
                  {classRoutingData?.map((item: any) => (
                    <>
                      {item?.file && (
                        <a
                          href={classRoutingURL + item.file}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseLeave={() => handleSubMouseLeave("class")}
                        >
                          {item?.className}
                        </a>
                      )}
                    </>
                  ))}
                </Box>
              )}
              <Link
                to={""}
                onMouseEnter={() => handleSubMouseEnter("exam")}
                className="sub_drop_down_menu_item_main"
              >
                Exam routing
              </Link>
              {showExamDropDown && (
                <Box className="sub_drop_down_menu_item">
                  {examData?.map((item: any) => (
                    <>
                      {item?.file && (
                        <a
                          href={examRoutingURL + item.file}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseLeave={() => handleSubMouseLeave("exam")}
                        >
                          {item?.className}
                        </a>
                      )}
                    </>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Button>
        <Button
          sx={{ color: "#fff" }}
          className="drop_down_main"
          onMouseEnter={() => handleMouseEnter("about")}
          onMouseLeave={() => handleMouseLeave("about")}
        >
          <Link to={"/about-us"} className="drop_down_menu">
            About us <KeyboardArrowDownIcon />
          </Link>
          {showAboutDropDown && (
            <Box className="drop_down_menu_item">
              <Link to={"/administrator"}>Administrator</Link>
              <Link to={"/teachers"}>Teacher’s</Link>
            </Box>
          )}
        </Button>
        <Button sx={{ color: "#fff" }}>
          <Link to={"/festival"}>Festival Photos</Link>
        </Button>
        <Button sx={{ color: "#fff" }}>
          <Link to={"/contact-us"}>Contact Us</Link>
        </Button>
        {user &&
          user?.role !== "admin" &&
          user?.role !== "teacher" &&
          user?.role !== "office-admin" && (
            <Button sx={{ color: "#fff" }}>
              <Link to={"/student-dashboard"}>Student portal</Link>
            </Button>
          )}
        {user?.role === "admin" && (
          <Button sx={{ color: "#fff" }}>
            <Link to={"/site-admin"}>Admin portal</Link>
          </Button>
        )}
        {user?.role === "teacher" && (
          <Button sx={{ color: "#fff" }}>
            <Link to={"/teacher-dashboard"}>Teacher portal</Link>
          </Button>
        )}
        {user?.role === "office-admin" && (
          <Button sx={{ color: "#fff" }}>
            <Link to={"/teacher-dashboard"}>Office-admin portal</Link>
          </Button>
        )}
        {!user?.username ? (
          <Button sx={{ color: "#fff" }}>
            <Link to={"/sign-in"}>Sign in</Link>
          </Button>
        ) : (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className="userIconNav"
            >
              {user?.photo && (
                <img src={userPhoto} alt="user" className="userImg" />
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
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <Box className="nav_main_container">
        <CssBaseline />
        <AppBar className="nav_container">
          <Container component="nav">
            <Toolbar style={{ padding: "0px", margin: "0px" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontSize: "18px",
                  fontWeight: "700",
                  display: { xs: "block", sm: "block" },
                }}
              >
                <Link to={"/"}>
                  <div className="logo">
                    <img src={image} alt="" />
                    <div>
                      <h5>Easy School</h5>{" "}
                      <span className="logo_subtitle">
                        Work for light nation
                      </span>
                    </div>
                  </div>
                </Link>
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Button sx={{ color: "#fff" }}>
                  <Link to={"/"}>Home</Link>
                </Button>
                <Button
                  sx={{ color: "#fff" }}
                  onMouseEnter={() => handleMouseEnter("student")}
                  onMouseLeave={() => handleMouseLeave("student")}
                  className="drop_down_main"
                >
                  <Link to={"/"} className="drop_down_menu">
                    Student corner <KeyboardArrowDownIcon />
                  </Link>
                  {showDropDown && (
                    <Box className="drop_down_menu_item">
                      <Link
                        to={"/"}
                        onMouseEnter={() => handleSubMouseEnter("book")}
                        className="sub_drop_down_menu_item_main"
                      >
                        Book list
                      </Link>
                      {showBookDropDown && (
                        <Box className="sub_drop_down_menu_item">
                          {bookData?.map((item: any) => (
                            <>
                              {item?.file && (
                                <a
                                  href={bookURL + item.file}
                                  download
                                  onMouseLeave={() =>
                                    handleSubMouseLeave("book")
                                  }
                                  target="_blank"
                                >
                                  {item.className}
                                </a>
                              )}
                            </>
                          ))}
                        </Box>
                      )}
                      <Link to={"/dress-code"}>Dress code</Link>
                      <Link
                        to={"/"}
                        onMouseEnter={() => handleSubMouseEnter("syllabus")}
                        className="sub_drop_down_menu_item_main"
                      >
                        Syllabus
                      </Link>
                      {showSyllabusDropDown && (
                        <Box className="sub_drop_down_menu_item">
                          {syllabusData?.map((item: any) => (
                            <>
                              {item?.file && (
                                <a
                                  href={syllabusURL + item.file}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onMouseLeave={() =>
                                    handleSubMouseLeave("syllabus")
                                  }
                                >
                                  {item?.className}
                                </a>
                              )}
                            </>
                          ))}
                        </Box>
                      )}
                      <Link
                        to={"/"}
                        onMouseEnter={() => handleSubMouseEnter("class")}
                        className="sub_drop_down_menu_item_main"
                      >
                        Class routing
                      </Link>
                      {showClassDropDown && (
                        <Box className="sub_drop_down_menu_item">
                          {classRoutingData?.map((item: any) => (
                            <>
                              {item?.file && (
                                <a
                                  href={classRoutingURL + item.file}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onMouseLeave={() =>
                                    handleSubMouseLeave("class")
                                  }
                                >
                                  {item?.className}
                                </a>
                              )}
                            </>
                          ))}
                        </Box>
                      )}
                      <Link
                        to={""}
                        onMouseEnter={() => handleSubMouseEnter("exam")}
                        className="sub_drop_down_menu_item_main"
                      >
                        Exam routing
                      </Link>
                      {showExamDropDown && (
                        <Box className="sub_drop_down_menu_item">
                          {examData?.map((item: any) => (
                            <>
                              {item?.file && (
                                <a
                                  href={examRoutingURL + item.file}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onMouseLeave={() =>
                                    handleSubMouseLeave("exam")
                                  }
                                >
                                  {item?.className}
                                </a>
                              )}
                            </>
                          ))}
                        </Box>
                      )}
                    </Box>
                  )}
                </Button>
                <Button
                  sx={{ color: "#fff" }}
                  className="drop_down_main"
                  onMouseEnter={() => handleMouseEnter("about")}
                  onMouseLeave={() => handleMouseLeave("about")}
                >
                  <Link to={"/about-us"} className="drop_down_menu">
                    About us <KeyboardArrowDownIcon />
                  </Link>
                  {showAboutDropDown && (
                    <Box className="drop_down_menu_item">
                      <Link to={"/administrator"}>Administrator</Link>
                      <Link to={"/teachers"}>Teacher’s</Link>
                    </Box>
                  )}
                </Button>
                <Button sx={{ color: "#fff" }}>
                  <Link to={"/festival"}>Festival Photos</Link>
                </Button>
                <Button sx={{ color: "#fff" }}>
                  <Link to={"/contact-us"}>Contact Us</Link>
                </Button>
                {user &&
                  user?.role !== "admin" &&
                  user?.role !== "teacher" &&
                  user?.role !== "office-admin" && (
                    <Button sx={{ color: "#fff" }}>
                      <Link to={"/student-dashboard"}>Student portal</Link>
                    </Button>
                  )}
                {user?.role === "admin" && (
                  <Button sx={{ color: "#fff" }}>
                    <Link to={"/site-admin"}>Admin portal</Link>
                  </Button>
                )}
                {user?.role === "teacher" && (
                  <Button sx={{ color: "#fff" }}>
                    <Link to={"/teacher-dashboard"}>Teacher portal</Link>
                  </Button>
                )}
                {user?.role === "office-admin" && (
                  <Button sx={{ color: "#fff" }}>
                    <Link to={"/teacher-dashboard"}>Office-admin portal</Link>
                  </Button>
                )}
                {!user?.username ? (
                  <Button sx={{ color: "#fff" }}>
                    <Link to={"/sign-in"}>Sign in</Link>
                  </Button>
                ) : (
                  <>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                      className="userIconNav"
                    >
                      {user?.photo && (
                        <img src={userPhoto} alt="user" className="userImg" />
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
                      <MenuItem>Profile</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </div>
  );
};

export default Navbar;

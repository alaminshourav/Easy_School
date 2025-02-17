import { Box, Container, Grid, Paper, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const TeacherProfile = () => {
  const { user } = useContext(AuthContext);
  const isSmallScreen = useMediaQuery("(max-width:650px)");
  const userImageUrl = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_TEACHER;

  return (
    <div>
      <Container maxWidth={"xl"}>
        <Paper
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          <Box className="main_profile">
            <form action="">
              <Grid
                sx={{
                  flexDirection: isSmallScreen ? "column-reverse" : "row",
                }}
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} lg={8} md={8}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={12} lg={6} md={6}>
                      <div className="user_info">
                        <label htmlFor="" className="input_label">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="name"
                          className="text_field"
                          defaultValue={user?.username}
                          disabled
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={6} md={6}>
                      <div className="user_info">
                        <label htmlFor="" className="input_label">
                          Email
                        </label>
                        <input
                          type="text"
                          placeholder="email"
                          className="text_field"
                          defaultValue={user?.email}
                          disabled
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={6} md={6}>
                      <div className="user_info">
                        <label htmlFor="" className="input_label">
                          Address
                        </label>
                        <input
                          type="text"
                          placeholder="password"
                          className="text_field"
                          defaultValue={user?.address}
                          disabled
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={6} md={6}>
                      <div className="user_info">
                        <label htmlFor="" className="input_label">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          placeholder="password"
                          className="text_field"
                          defaultValue={user?.phoneNumber}
                          disabled
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={12} md={12}>
                      <div className="user_info">
                        <label htmlFor="" className="input_label">
                          Password
                        </label>
                        <input
                          type="text"
                          placeholder="password"
                          className="text_field"
                          defaultValue={user?.password}
                          disabled
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <div className="user_photo">
                    <img src={userImageUrl + user?.photo} alt="" />
                  </div>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default TeacherProfile;

import { Box, Container, Grid, Paper } from "@mui/material";
import "./mainDashboard.css";
import Chart from "./Chart";
import image1 from "../../../assets/icon/profile.png";
import image2 from "../../../assets/icon/admin.png";
import image3 from "../../../assets/icon/class.png";
import useFetch from "../../../hooks/useFetch";
import { StudentType, TeacherType } from "../../../types/AdminProps.type";
import Loader from "../../../components/loader/Loader";

const SideAdminMain = () => {
  const { data: studentData, loading: studentLoading } = useFetch<
    StudentType[]
  >(`${import.meta.env.VITE_REACT_APP_BASE_URL}/student`);
  const { data: employeeData, loading: employeeLoading } = useFetch<
    TeacherType[]
  >(`${import.meta.env.VITE_REACT_APP_BASE_URL}/employee`);
  const { data: classData, loading: classLoading } = useFetch<TeacherType[]>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/class`
  );
  return (
    <div>
      {studentLoading || employeeLoading || classLoading ? (
        <Loader />
      ) : (
        <Container maxWidth={"xl"}>
          <Paper
            className="dashboard_container_form"
            style={{ marginTop: "120px" }}
          >
            <Box
              sx={{
                boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.502)",
                padding: "20px 15px 30px 15px",
                mb: 3,
                borderRadius: 2,
              }}
            >
              <h3 className="dashboard_common_title">Employee & Student</h3>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} lg={4} md={4}>
                  <Box
                    className="dashboard_main_card"
                    sx={{ background: "#fff4de" }}
                  >
                    <span className="dashboard_main_card_icon">
                      <img src={image1} alt="" />
                    </span>
                    <h4 className="common_medium_title">Student's</h4>
                    <h5 className="common_medium_title">
                      {studentData?.length}
                    </h5>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <Box
                    className="dashboard_main_card"
                    sx={{ background: "#f3e8ff" }}
                  >
                    <span className="dashboard_main_card_icon">
                      <img src={image2} alt="" />
                    </span>
                    <h4 className="common_medium_title">Employee's</h4>
                    <h5 className="common_medium_title">
                      {employeeData?.length}
                    </h5>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <Box
                    className="dashboard_main_card"
                    sx={{ background: "#70c6548c" }}
                  >
                    <span className="dashboard_main_card_icon">
                      <img src={image3} alt="" />
                    </span>
                    <h4 className="common_medium_title">Classes</h4>
                    <h5 className="common_medium_title">{classData?.length}</h5>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.502)",
                padding: "20px 15px 30px 15px",
                borderRadius: 2,
                mb: 3,
              }}
            >
              <Chart />
            </Box>
          </Paper>
        </Container>
      )}
    </div>
  );
};

export default SideAdminMain;

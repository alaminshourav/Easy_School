import { Box, Container, Paper } from "@mui/material";
import "./setting.css";
import ClassWise from "./classWise/ClassWise";
import { useState } from "react";
import TeacherWise from "./teacherWise/TeacherWise";
import History from "./history/History";

const Setting = () => {
  const [shawTab, setShawTab] = useState("classWise");
  return (
    <div>
      <Container maxWidth={"xl"}>
        <Paper className="dashboard_container" style={{ marginTop: "120px" }}>
          <h2 className="common_dashboard_title">Report 2024</h2>
          <Box className="tab_main">
            <Box className="tab">
              <button
                className={
                  shawTab === "classWise" ? "tab_btn_active" : "tab_btn"
                }
                onClick={() => setShawTab("classWise")}
              >
                Class Wise
              </button>
              <button
                className={
                  shawTab === "teacherWise" ? "tab_btn_active" : "tab_btn"
                }
                onClick={() => setShawTab("teacherWise")}
              >
                Teacher wise
              </button>
              <button
                className={shawTab === "history" ? "tab_btn_active" : "tab_btn"}
                onClick={() => setShawTab("history")}
              >
                History
              </button>
            </Box>
          </Box>
          {shawTab === "classWise" && <ClassWise />}
          {shawTab === "teacherWise" && <TeacherWise />}
          {shawTab === "history" && <History />}
        </Paper>
      </Container>
    </div>
  );
};

export default Setting;

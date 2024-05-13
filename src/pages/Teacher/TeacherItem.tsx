import { Box, Grid } from "@mui/material";

import { TeacherType } from "../../types/AdminProps.type";

const TeacherItem = ({ item }: { item: TeacherType }) => {
  const teacherImageURL = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_TEACHER;
  return (
    <Grid item xs={12} lg={4} md={4}>
      <Box className="teacher_card">
        <Box className="img_container">
          <img src={item?.photo && teacherImageURL + item?.photo} alt="" />
        </Box>
        <Box className="text_container">
          <p className="common_para flex_para">
            <b>Name :</b> {item?.username}
          </p>
          <p className="common_para flex_para">
            <b>Mobile :</b> {item?.phoneNumber}
          </p>
          <p className="common_para flex_para">
            <b>Email :</b> {item?.email}
          </p>
        </Box>

        <Box className="details_btn">
          <button>Details</button>
        </Box>
      </Box>
    </Grid>
  );
};

export default TeacherItem;

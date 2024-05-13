import { Container, Grid } from "@mui/material";
import "./teacher.css";
import TeacherItem from "./TeacherItem";

import useFetch from "../../hooks/useFetch";
import { TeacherType } from "../../types/AdminProps.type";
import Loader from "../../components/loader/Loader";

const Teacher = () => {
  const { data: teacher, loading } = useFetch<TeacherType[] | null>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/employee?role=teacher`
  );

  return (
    <div className="common_height">
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <div className="heading_padding section_padding">
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
            >
              {teacher?.map((item: TeacherType) => (
                <TeacherItem key={item._id} item={item} />
              ))}
            </Grid>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Teacher;

import { Container, Grid, Paper } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { addSuccessfully, toastError } from "../../../util/message";

const AddMark = () => {
  const { id } = useParams();
  const [studentMark, setStudentMark] = useState<
    { name: string; value: string }[]
  >([]);
  const location = useLocation();
  const classData = location.state.classData;
  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    subject: string
  ) => {
    const value = e.target.value;
    setStudentMark((prevMarks) => {
      const existingMark = prevMarks.find((mark) => mark.name === subject);

      if (existingMark) {
        return prevMarks.map((mark) =>
          mark.name === subject ? { ...mark, value } : mark
        );
      } else {
        return [...prevMarks, { name: subject, value }];
      }
    });
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/student/${id}`,
        studentMark
      );
      if (res.status === 200) {
        addSuccessfully("Added Successfully");
      }
    } catch (error) {
      toastError("Something is wrong");
    }
  };
  const handleBack = () => {
    navigate("/teacher-dashboard//my-class");
  };
  return (
    <Container maxWidth={"xl"}>
      <Paper className="dashboard_container" style={{ marginTop: "120px" }}>
        <div>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {classData?.teacher.map((item: any) => (
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  {item.subject}
                </label>
                <input
                  type="text"
                  onChange={(e) => handleChange(e, item.subject)}
                  className="text_field"
                />
              </Grid>
            ))}
          </Grid>
          <div className="dashboard_btn_container">
            <button className="submit_btn" onClick={handleBack}>
              Previous
            </button>
            <button className="submit_btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default AddMark;

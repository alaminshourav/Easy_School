import { Container, Grid, Paper } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { addSuccessfully, toastError } from "../../../../../util/message";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const [year, setYear] = useState("");
  const [shift, setShift] = useState("");
  const [classes, setClass] = useState("");
  const [section, setSection] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const newData = {
      year,
      shift,
      class: classes,
      section,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/class`,
        newData
      );
      if (res.status === 201) {
        addSuccessfully("Successfully Added");
        setYear("");
        setShift("");
        setClass("");
        setSection("");
        setTimeout(() => {
          navigate(`/site-admin/add-subject/${res.data._id}`);
        }, 2000);
      }
    } catch (error) {
      toastError("Something is wrong");
    }
  };

  const handleBack = () => {
    navigate("/site-admin/student-class");
  };
  return (
    <div>
      <Container maxWidth="xl">
        <Paper
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          <h3 className="dashboard_common_title">Add Class</h3>
          <div>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Year
                </label>
                <input
                  type="text"
                  placeholder="add a year"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setYear(e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Shift
                </label>
                <input
                  type="text"
                  placeholder="add a shift"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShift(e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Class
                </label>

                <input
                  type="text"
                  placeholder="add class name"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setClass(e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <label htmlFor="" className="input_label">
                  Section
                </label>
                <input
                  type="text"
                  placeholder="add a section"
                  className="text_field"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSection(e.target.value)
                  }
                />
              </Grid>
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
    </div>
  );
};

export default AddClass;

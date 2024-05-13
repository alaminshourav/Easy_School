import { Box, Container, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { addSuccessfully, toastError } from "../../../../util/message";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../../../components/fileUpload/FileUpload";

const AddFestival = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async () => {
    const newData = {
      title,
      year,
      photo: "",
    };
    if (files) {
      await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          const fileName = Date.now() + file.name.replace(/\s+/g, "_");
          data.append("name", fileName);
          data.append("festival", file);
          try {
            const uploadRes = await axios.post(
              `${import.meta.env.VITE_REACT_APP_BASE_URL}/upload`,
              data
            );
            if (uploadRes.status === 201) {
              newData.photo = fileName;
            }
          } catch (err) {
            console.log(err);
          }
        })
      );
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/festival`,
          newData
        );

        if (res.status === 201) {
          setIsDisabled(true);
          setTitle("");
          setFiles(null);
          setYear("");
          addSuccessfully("Successfully Added");
          setTimeout(() => {
            navigate("/office-admin/festival");
          }, 2000);
        }
      } catch (error) {
        toastError("Something is wrong");
      }
    }
  };

  const handleBack = () => {
    navigate("/office-admin/festival");
  };
  return (
    <div className="dashboard_containerBefore">
      <Container maxWidth="xl">
        <Box
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          <h2 className="common_title">Add Notice</h2>
          <Box className="dashboard_container_input">
            <div className="type_form">
              <FileUpload files={files} setFiles={setFiles} />
              <div className="flex_inputs">
                <Box className="dashboard_input" sx={{ pb: 3 }}>
                  <p>Title</p>
                  <TextField
                    variant="outlined"
                    id="title"
                    required
                    placeholder="title"
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                      setTitle(e.target.value)
                    }
                  />
                </Box>
                <Box className="dashboard_input" sx={{ pb: 3 }}>
                  <p>Year</p>
                  <TextField
                    variant="outlined"
                    id="title"
                    required
                    placeholder="class"
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                      setYear(e.target.value)
                    }
                  />
                </Box>
              </div>
            </div>
          </Box>
          <div className="dashboard_btn_container">
            <button className="submit_btn" onClick={handleBack}>
              Previous
            </button>
            <button
              className="submit_btn"
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Submit
            </button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default AddFestival;

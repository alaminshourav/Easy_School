import { Box, Container, TextField } from "@mui/material";
import { useState } from "react";
import PDFFileUpload from "../../../../components/fileUpload/PDFFileUpload";
import axios from "axios";
import { addSuccessfully, toastError } from "../../../../util/message";
import { useNavigate } from "react-router-dom";

const AddExamRouting = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [studentClassName, setStudentClassName] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const handleInitImage = (fileToRemove: File) => {
    if (files !== null) {
      const filesArray = Array.from(files);
      const updatedFiles = filesArray.filter((file) => file !== fileToRemove);
      setFiles(updatedFiles);
    }
  };

  const handleSubmit = async () => {
    const newData = {
      className: studentClassName,
      file: "",
    };
    if (files) {
      await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          const fileName = Date.now() + file.name.replace(/\s+/g, "_");
          data.append("name", fileName);
          data.append("exam-routing", file);
          try {
            const uploadRes = await axios.post(
              `${import.meta.env.VITE_REACT_APP_BASE_URL}/upload`,
              data
            );
            if (uploadRes.status === 201) {
              newData.file = fileName;
            }
          } catch (err) {
            console.log(err);
          }
        })
      );
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/exam-routing`,
          newData
        );

        if (res.status === 201) {
          setIsDisabled(true);
          addSuccessfully("successfully added");
          setTimeout(() => {
            navigate("/office-admin/exam-routing");
          }, 2000);
        }
      } catch (error) {
        toastError("Something is wrong");
      }
    }
  };
  const handleBack = () => {
    navigate("/office-admin/exam-routing");
  };
  return (
    <div className="dashboard_containerBefore">
      <Container maxWidth={"xl"}>
        <Box
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          <h2 className="common_title">Add Exam Routing</h2>
          <Box className="dashboard_container_input">
            <div className="type_form">
              <PDFFileUpload
                files={files}
                setFiles={setFiles}
                handleInitImage={handleInitImage}
              />
              <Box className="dashboard_input" sx={{ pb: 3 }}>
                <p>Class Name</p>
                <TextField
                  variant="outlined"
                  id="title"
                  required
                  placeholder="class"
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                    setStudentClassName(e.target.value)
                  }
                />
              </Box>
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

export default AddExamRouting;

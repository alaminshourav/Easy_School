import "../adminBookList.css";
import "../../adminSidebar/adminSidebar.css";
import { Box, Container, TextField } from "@mui/material";
import { useContext, useState } from "react";
import PDFFileUpload from "../../../../components/fileUpload/PDFFileUpload";
import axios from "axios";
import { addSuccessfully, toastError } from "../../../../util/message";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

const AddBookList = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [studentClassName, setStudentClassName] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
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
          data.append("book", file);
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
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/book-list`,
          newData
        );

        if (res.status === 201) {
          addSuccessfully("successfully added");
          if (user?.role === "admin") {
            setTimeout(() => {
              navigate("/site-admin/book-list");
            }, 2000);
          } else {
            setTimeout(() => {
              navigate("/office-admin/book-list");
            }, 2000);
          }
        }
      } catch (error) {
        toastError("Something is wrong");
      }
    }
  };

  const handleBack = () => {
    if (user?.role === "admin") {
      navigate("/site-admin/book-list");
    } else {
      navigate("/office-admin/book-list");
    }
  };
  return (
    <div className="dashboard_containerBefore">
      <Container maxWidth={"xl"}>
        <Box
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          <h2 className="common_title">Add Book list</h2>
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
            <button className="submit_btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default AddBookList;

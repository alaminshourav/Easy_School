import "../adminBookList.css";
import "../../adminSidebar/adminSidebar.css";
import { Box, Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import EditPDFUpload from "../../../../components/fileUpload/EditPDFUpload";
import { BookListProps } from "../../../../types/BookListProps.type";
import axios from "axios";
import { addSuccessfully, toastError } from "../../../../util/message";
import { AuthContext } from "../../../../context/AuthContext";

const EditBookList = () => {
  const { id } = useParams();
  const [files, setFiles] = useState<File[] | null>(null);
  const [studentClassName, setStudentClassName] = useState<string>("");
  const [initialFile, setInitialFile] = useState<string | null>(null);
  const { data } = useFetch<BookListProps | null>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/book-list/${id}`
  );
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    data?.className && setStudentClassName(data.className);
    data?.file && setInitialFile(data.file);
  }, [data]);

  const handleInitImage = (fileToRemove: any) => {
    if (files !== null) {
      const filesArray = Array.from(files);
      const updatedFiles = filesArray.filter((file) => file !== fileToRemove);
      setFiles(updatedFiles);
    }
  };
  const handleDelete = (file: string | undefined) => {
    try {
      axios
        .delete(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/delete/${file}?book-list=book-list`
        )
        .then(() => {});
    } catch (error) {}
  };
  const handleSubmit = async () => {
    const newData = {
      className: studentClassName,
      file: initialFile,
    };
    if (files) {
      await Promise.all(
        Object.values(files).map(async (file) => {
          const imageData = new FormData();
          const fileName = Date.now() + file.name.replace(/\s+/g, "_");
          imageData.append("name", fileName);
          imageData.append("book", file);
          try {
            const uploadRes = await axios.post(
              `${import.meta.env.VITE_REACT_APP_BASE_URL}/upload`,
              imageData
            );
            if (uploadRes.status === 201) {
              newData.file = fileName;
              handleDelete(data?.file || undefined);
            }
          } catch (err) {
            console.log(err);
          }
        })
      );
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/book-list/${id}`,
        newData
      );

      if (res.status === 200) {
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
      <Container>
        <Box
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          <h2 className="common_title">Edit Book list</h2>
          <Box className="dashboard_container_input">
            <div className="type_form">
              <EditPDFUpload
                files={files}
                setFiles={setFiles}
                handleInitImage={handleInitImage}
              />
              <div className="flex_inputs">
                <Box className="dashboard_input">
                  <p>Class Name</p>
                  <input
                    id="title"
                    required
                    className="text_field"
                    defaultValue={data?.className}
                  />
                </Box>
              </div>
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

export default EditBookList;

import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { addSuccessfully, toastError } from "../../../../util/message";
import { FestivalProps } from "../../../../types/AdminProps.type";
import EditFileUpload from "../../../../components/fileUpload/EditFIleUpload";

const EditFestival = () => {
  const { id } = useParams();
  const [files, setFiles] = useState<File[] | null>(null);
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [initialPhoto, setInitialPhoto] = useState<string | null>(null);
  const { data } = useFetch<FestivalProps | null>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/festival/${id}`
  );
  const photoUrl = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER_FESTIVAL;
  const navigate = useNavigate();

  useEffect(() => {
    data?.title && setTitle(data.title);
    data?.year && setYear(data.year);
    data?.photo && setInitialPhoto(data.photo);
  }, [data]);

  const handleImage = (link: string | undefined, folder: string) => {
    try {
      axios
        .delete(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/delete/${link}?${folder}=${folder}`
        )
        .then((res) => {
          if (res.status === 200) {
            addSuccessfully("Image Deleted Successfully");
            setInitialPhoto("");
          }
        });
    } catch (error) {
      toastError("Something is wrong");
    }
  };
  const handleSubmit = async () => {
    const newData = {
      title,
      year,
      photo: initialPhoto,
    };
    if (files) {
      await Promise.all(
        Object.values(files).map(async (file) => {
          const imgData = new FormData();
          const fileName = Date.now() + file.name.replace(/\s+/g, "_");
          imgData.append("name", fileName);
          imgData.append("festival", file);
          try {
            const uploadRes = await axios.post(
              `${import.meta.env.VITE_REACT_APP_BASE_URL}/upload`,
              imgData
            );
            if (uploadRes.status === 201) {
              newData.photo = fileName;
              handleImage(data?.photo || undefined, "festival");
            }
          } catch (err) {
            console.log(err);
          }
        })
      );
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/festival/${id}`,
        newData
      );

      if (res.status === 200) {
        addSuccessfully("successfully added");
        setTimeout(() => {
          navigate("/office-admin/festival");
        }, 2000);
      }
    } catch (error) {
      toastError("Something is wrong");
    }
  };

  const handleBack = () => {
    navigate("/office-admin/festival");
  };

  return (
    <div className="dashboard_containerBefore">
      <Container maxWidth={"xl"}>
        <Box
          className="dashboard_container_form"
          style={{ marginTop: "120px" }}
        >
          <h2 className="common_title">Edit Notice</h2>
          <Box className="dashboard_container_input">
            <div className="type_form">
              <EditFileUpload
                files={files}
                setFiles={setFiles}
                photo={data?.photo}
                pathName={photoUrl}
                folderName="festival"
              />
              <div className="flex_inputs">
                <Box className="dashboard_input">
                  <p>Title</p>
                  <input
                    id="title"
                    required
                    className="text_field"
                    defaultValue={data?.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTitle(e.target.value)
                    }
                  />
                </Box>
                <Box className="dashboard_input">
                  <p>Year</p>
                  <input
                    id="title"
                    required
                    className="text_field"
                    defaultValue={data?.year}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
            <button className="submit_btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default EditFestival;

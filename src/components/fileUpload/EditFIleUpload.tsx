import uploadImg from "../../assets/upload1.png";
// import DeleteIcon from "@mui/icons-material/Delete";
import "./fileUpload.css";

interface Props {
  files: File[] | null;
  photo: string | undefined;
  pathName: string;
  folderName: string;
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
  // handleImage: (link: string, folderName: string) => void;
}

const EditFileUpload: React.FC<Props> = ({
  files,
  setFiles,
  photo,
  pathName,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList) as File[];
      setFiles(filesArray);
    } else {
      setFiles(null);
    }
  };
  const determineSrc = () => {
    if (photo) {
      return pathName + photo;
    }

    if (Array.isArray(files) && files.length > 0) {
      const file = files[0];
      return URL.createObjectURL(file);
    }

    return uploadImg;
  };
  return (
    <>
      <div className="upload_container_main_edit">
        <div className="upload_img_init">
          <input
            accept="image/png, image/jpeg, image/jpg, image/svg"
            style={{ display: "none" }}
            id="localGuide"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="localGuide" className="upload_img_text">
            <img
              src={determineSrc()}
              alt="uploadPhoto"
              className="uploading_img"
            />
            <span>Add Photos</span>
          </label>
        </div>
      </div>
      {/* <div className="image_row">
        {photo && (
          <>
            {photo && (
              <div className="image_col">
                <img src={pathName + photo} alt="uploadPhoto" />
                <span
                  className="img_delete_icon"
                  onClick={() => handleImage(photo, folderName)}
                >
                  <DeleteIcon />
                </span>
              </div>
            )}
          </>
        )}
        {files && files.length > 0 && (
          <>
            {Array?.from(files)?.map((file, i) => (
              <div className="image_col" key={i}>
                <img src={URL.createObjectURL(file)} alt="uploadPhoto" />
                <span
                  className="img_delete_icon"
                  onClick={() => handleInitImage(file)}
                >
                  <DeleteIcon />
                </span>
              </div>
            ))}
          </>
        )}
      </div> */}
    </>
  );
};

export default EditFileUpload;

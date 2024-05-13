import uploadImg from "../../assets/upload1.png";
import "./fileUpload.css";

interface Props {
  files: File[] | null;
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
}

const FileUpload: React.FC<Props> = ({ files, setFiles }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList) as File[];
      setFiles(filesArray);
    } else {
      setFiles(null);
    }
  };
  return (
    <>
      <div className="upload_container_main">
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
              src={
                files && files.length > 0
                  ? URL.createObjectURL(files[0])
                  : uploadImg
              }
              alt="uploadPhoto"
              className="uploading_img"
            />
            <span>Add Photos</span>
          </label>
        </div>
      </div>
      <div className="image_row">
        {/* {(data?.photos || imageLink) && (
          <>
            {data?.photos
              ? data?.photos?.map((item) => (
                  <div className="image_col">
                    <img
                      src={data?.imageLink ? item : imagePath + item}
                      alt="uploadPhoto"
                    />
                    <span
                      className="img_delete_icon"
                      onClick={() => handleImage(item, folderName)}
                    >
                      <DeleteIcon />
                    </span>
                  </div>
                ))
              : imageLink?.map((item) => (
                  <div className="image_col">
                    <img src={imagePath + item} alt="uploadPhoto" />
                    <span
                      className="img_delete_icon"
                      onClick={() => handleImage(item, folderName)}
                    >
                      <DeleteIcon />
                    </span>
                  </div>
                ))}
          </>
        )} */}
        {/* {files && files.length > 0 && (
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
        )} */}
      </div>
    </>
  );
};

export default FileUpload;

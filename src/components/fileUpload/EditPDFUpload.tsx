import uploadImg from "../../assets/upload1.png";
import DeleteIcon from "@mui/icons-material/Delete";
import "./fileUpload.css";
import DashboardPDF from "../dashboardPDF/DashboardPDF";

interface Props {
  files: File[] | null | undefined;
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
  handleInitImage: (fileToRemove: File) => void;
}

const EditPDFUpload: React.FC<Props> = ({
  files,
  setFiles,
  handleInitImage,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList) as File[];
      const pdfFiles = filesArray.filter(
        (file) => file.type === "application/pdf"
      );
      setFiles(pdfFiles);
    } else {
      setFiles(null);
    }
  };
  console.log({ files });

  return (
    <>
      <div className="upload_container_main">
        <div className="upload_img_init">
          <input
            accept="application/pdf"
            style={{ display: "none" }}
            id="localGuide"
            type="file"
            name="localGuide"
            onChange={handleFileChange}
            multiple
            required
          />
          <label htmlFor="localGuide" className="upload_img_text">
            <img src={uploadImg} alt="uploadPhoto" className="uploading_img" />
            <span>Add PDF</span>
          </label>
        </div>
      </div>
      <div className={files ? "pdf_row" : "image_row"}>
        {/* {data && (
          <>
            <div className="pdf_col">
              <DashboardPDF link={URL.createObjectURL(data?.file)} />
              <span
                className="img_delete_icon"
                onClick={() => handleInitImage(data?.file)}
              >
                <DeleteIcon />
              </span>
            </div>
          </>
        )} */}
        {files && files?.length > 0 && (
          <>
            {Array?.from(files)?.map((file, i) => (
              <div className="pdf_col" key={i}>
                <DashboardPDF link={URL.createObjectURL(file)} />
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
      </div>
    </>
  );
};

export default EditPDFUpload;

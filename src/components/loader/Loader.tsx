import CircularProgress from "@mui/material/CircularProgress";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loader;

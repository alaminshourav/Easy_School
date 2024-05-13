import "./Gallery.css";

import GalleryItem from "./GalleryItem";
import { Box } from "@mui/material";
import useFetch from "../../../hooks/useFetch";

const Gallery = () => {
  const { data } = useFetch<any>(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/festival`
  );

  return (
    <div className="common_bg section_padding">
      <Box sx={{ textAlign: "center" }}>
        <h2 className="common_title heading_padding">Our Gallery </h2>
      </Box>
      <div className="galleryBody">
        {data?.map((item: any, index: any) => (
          <GalleryItem index={index} item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;

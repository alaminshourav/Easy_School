import { Box, Container } from "@mui/material";
import "./Festival.css";
import { galleryData } from "../../util/bannerData";
import { GalleryProps } from "../../types/HomePageProps.type";
import GalleryItem from "../../components/home/gallery/GalleryItem";

const Festival = () => {
  return (
    <div className="common_bg section_padding">
      <Box sx={{ py: 10 }}>
        <Container maxWidth="xl">
          <h2 className="common_title heading_padding">Our festival photos</h2>
          <div className="galleryBody">
            {galleryData?.map((item: GalleryProps, index: number) => (
              <GalleryItem
                index={index}
                title={item?.title}
                photo={item?.photo}
                key={index}
              />
            ))}
          </div>
        </Container>
      </Box>
    </div>
  );
};

export default Festival;

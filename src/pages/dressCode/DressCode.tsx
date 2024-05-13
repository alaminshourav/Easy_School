import { Box, Container, Grid } from "@mui/material";
import image1 from "../../assets/dress/boy.jpg";
import image2 from "../../assets/dress/girl.jpg";
import "./dressCode.css";

const DressCode = () => {
  return (
    <div className="common_height">
      <Container maxWidth={"xl"} sx={{ py: 5 }}>
        <div className="heading_container">
          <h2 className="common_title">School Uniform</h2>
          <p className="common_para">
            School uniform is to be collected from the office on payment basis.
            School uniform for boys and girls will be as follows:
          </p>
        </div>
        <Box className="heading_padding section_padding">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} lg={6} md={6}>
              <div className="dress_image_container">
                <img src={image1} alt="" />
              </div>
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <div className="dress_text_container">
                <h5 className="common_sub_title">
                  Boys (Play Group to Grade-IX)
                </h5>
                <p>
                  Shirt: <b> Tan-colored (wheat) half/full sleeve shirt</b>
                </p>
                <p>A monogram is to be sewn on the pocket of the shirt.</p>
                <p>
                  Pants: <b> Deep brown full-length pants</b>
                </p>
                <p>
                  Shoes:
                  <b>Black shoes</b>
                </p>
                <p>
                  Socks: <b>Plain white socks</b>
                </p>
                <p>
                  Belt: <b>Black</b>
                </p>
                <h5 className="common_sub_title">Winter Dress</h5>
                <p>
                  Boys: <b>Full/sleeveless burgundy colour sweater</b>
                </p>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ pt: 3 }}
          >
            <Grid item xs={12} lg={6} md={6}>
              <div className="dress_text_container">
                <h5 className="common_sub_title">
                  Girls (Play Group to KG-II)
                </h5>
                <p>
                  Frock:<b> Dark brown half/full sleeve frock Shirt</b>
                </p>

                <p>
                  (length: <b> four fingers below the knee</b>)
                </p>
                <p>A monogram is to be sewn on the right side of the sleeve.</p>
                <p>
                  Shoes: <b>Black one-strap shoes</b>
                </p>
                <p>
                  Socks: <b>Plain white socks</b>
                </p>
                <h5 className="common_sub_title">Winter Dress</h5>
                <p>
                  Girls: <b>Full sleeve burgundy colour cardigan</b>
                </p>
              </div>
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <div className="dress_image_container">
                <img src={image2} alt="" />
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default DressCode;

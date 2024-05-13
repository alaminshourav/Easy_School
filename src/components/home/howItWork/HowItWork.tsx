import { Box, Grid } from "@mui/material";
import "./howItWork.css";
import image1 from "../../../assets/how_to_work/image1.png";
import image2 from "../../../assets/how_to_work/image2.png";
import image3 from "../../../assets/how_to_work/image3.png";

const HowItWork = () => {
  return (
    <Box className="section_padding">
      <div className="heading_container">
        <h2 className="common_title">How does it works ?</h2>
        <p className="common_para">
          Are you looking to join online institutions? Now it's very simple,
          Sign up with mentoring
        </p>
      </div>
      <Box className="heading_padding">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} lg={4} md={4}>
            <div className="work_card">
              <div className="card_image_container">
                <img src={image1} alt="" />
              </div>
              <div className="card_title">
                <h5>Sign up</h5>
              </div>
              <div className="card_body">
                <p>
                  Are you looking to join online Learning? Now it's very simple,
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <div className="work_card">
              <div className="card_image_container">
                <img src={image2} alt="" />
              </div>
              <div className="card_title">
                <h5>Collaborate</h5>
              </div>
              <div className="card_body">
                <p>
                  Collaborate on your own timing, by scheduling with mentor
                  booking
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <div className="work_card">
              <div className="card_image_container">
                <img src={image3} alt="" />
              </div>
              <div className="card_title">
                <h5>Improve & Get Back</h5>
              </div>
              <div className="card_body">
                <p>
                  you can gather different skill set, and you can become mentor
                  too
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HowItWork;

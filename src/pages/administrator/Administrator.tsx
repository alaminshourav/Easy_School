import { Box, Container, Grid } from "@mui/material";
import "./administrator.css";
import image1 from "../../assets/teacher/teacher11.jpg";

const Administrator = () => {
  return (
    <div className="common_height">
      <Container maxWidth={"xl"}>
        <Box className="administrator_main">
          <h2 className="common_title">message from the Honorable Principal</h2>
        </Box>
        <Box sx={{ pb: 5 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
          >
            <Grid item xs={12} lg={5} md={5}>
              <div className="principal_image">
                <img src={image1} alt="" />
              </div>
            </Grid>
            <Grid item xs={12} lg={7} md={7}>
              <div className="administrator_content">
                <p className="common_para">
                  I hope this message finds you all in good health and high
                  spirits as we embark on another exciting academic year at Easy
                  School.
                </p>
                <p className="common_para">
                  As we stand on the threshold of a new beginning, I am filled
                  with a sense of optimism and anticipation for the
                  opportunities and adventures that lie ahead. Each new school
                  year brings with it the promise of growth, discovery, and
                  transformation, and I am confident that this year will be no
                  exception.
                </p>
                <p className="common_para">
                  To our returning students, welcome back! Your presence
                  enriches our school community, and I am delighted to see your
                  familiar faces once again. I hope you return to school with
                  renewed energy and enthusiasm, ready to dive into your studies
                  and embrace all that this year has to offer.
                </p>
                <p className="common_para">
                  To our returning students, welcome back! Your presence
                  enriches our school community, and I am delighted to see your
                  familiar faces once again. I hope you return to school with
                  renewed energy and enthusiasm, ready to dive into your studies
                  and embrace all that this year has to offer.
                </p>
                <p className="common_para">
                  <i>MD. Takirm</i>
                </p>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Administrator;

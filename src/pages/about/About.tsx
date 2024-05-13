import { Box, Container, Grid } from "@mui/material";
import "./About.css";
import image from "../../assets/about/about.jpeg";

const About = () => {
  return (
    <div className="common_height">
      <Container maxWidth={"xl"}>
        <Box sx={{ py: 12 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
          >
            <Grid item xs={12} lg={6} md={6}>
              <div className="principal_image">
                <img src={image} alt="" />
              </div>
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <div className="administrator_content">
                <h3 className="common_title">
                  <i>About us</i>
                </h3>

                <p className="common_para">
                  Welcome to Easy School! We are thrilled to have you with us as
                  we start another exciting academic year.
                </p>
                <p className="common_para">
                  Welcome to Easy School! We are thrilled to have you with us as
                  we start another exciting academic year. This year, we're
                  filled with optimism and anticipation for the new experiences
                  and opportunities that await. At Easy School, we believe each
                  year is a chance to grow, learn, and discover new talents. Our
                  commitment is to provide a supportive and enriching
                  environment for all our students.
                </p>
                <p className="common_para">
                  To our returning students, welcome back! Your presence and
                  contributions are what make our school community so vibrant.
                  We're excited to see your familiar faces and hope you come
                  back with renewed energy and enthusiasm. We encourage you to
                  dive into your studies and embrace all the opportunities this
                  year brings.
                </p>
                <p className="common_para">
                  At Easy School, we aim to create a place where you can thrive
                  academically and personally. Let's make this year memorable
                  and full of success. Thank you for being part of the Easy
                  School family!
                </p>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default About;

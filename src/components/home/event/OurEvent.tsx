import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import "./ourEvent.css";
import image1 from "../../../assets/event/event1.jpg";
import image2 from "../../../assets/event/event2.jpg";
import image3 from "../../../assets/event/event3.jpg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const OurEvent = () => {
  return (
    <div className="section_padding">
      <div className="heading_container">
        <h2 className="common_title">Upcoming Events</h2>
        <p className="common_para">
          Every week, we organize a variety of events for our students and
          undergraduates. From webinars to creative events, there are activities
          that are always worth your attention.
        </p>
      </div>
      <Box className="heading_padding">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} lg={4} md={4}>
            <Card>
              <CardMedia
                sx={{ height: 250 }}
                image={image1}
                title="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "600", fontSize: "18px" }}
                  variant="h5"
                  component="div"
                >
                  Creative Day
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    <AccessTimeIcon sx={{ color: "#f7a31a" }} /> 7:00 am - 2:00
                    pm
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    <LocationOnOutlinedIcon sx={{ color: "#f7a31a" }} /> Dhaka,
                    Bangladesh
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#0C0B20", lineHeight: "25px" }}
                >
                  Welcome to our Creativity Carnival, where imagination knows no
                  bounds! Join us for a day filled with fun and inspiration as
                  we celebrate creativity in all its forms. From arts and crafts
                  to music and storytelling, there's something for everyone to
                  enjoy. Let your creativity soar and unleash your inner artist
                  at our various interactive stations. Don't miss out on this
                  exciting opportunity to explore, create, and connect with
                  fellow creators!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <Card>
              <CardMedia
                sx={{ height: 250 }}
                image={image2}
                title="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "600", fontSize: "18px" }}
                >
                  Poetry Event
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1,
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <AccessTimeIcon sx={{ color: "#f7a31a" }} /> 9:00 am - 1:00
                    pm
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <LocationOnOutlinedIcon sx={{ color: "#f7a31a" }} /> Dhaka,
                    Bangladesh
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#0C0B20", lineHeight: "25px" }}
                >
                  Welcome to our Poetry Picnic, where words dance and
                  imagination blooms! Join us for a delightful afternoon of
                  rhythm and rhyme as we celebrate the beauty of poetry. Bring
                  your favorite poems or compose new ones on the spot, and let's
                  weave a tapestry of verses together in the great outdoors.
                  Whether you're a seasoned poet or just discovering the magic
                  of words, everyone is welcome to share and enjoy the power of
                  poetry in a relaxed and welcoming.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <Card>
              <CardMedia
                sx={{ height: 250 }}
                image={image3}
                title="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "600",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  Undergraduate Day
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1,
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <AccessTimeIcon sx={{ color: "#f7a31a" }} /> 9:00 am - 4:00
                    pm
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <LocationOnOutlinedIcon sx={{ color: "#f7a31a" }} /> Dhaka,
                    Bangladesh
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#0C0B20", lineHeight: "25px" }}
                >
                  Welcome to Undergraduate Adventure, where exploration meets
                  education! Join us for a day filled with excitement and
                  discovery as we delve into the world of higher education.
                  Whether you're a high school student curious about college
                  life or a prospective undergraduate seeking information, this
                  event is tailored just for you. From interactive workshops to
                  informative panels, there's something for everyone to explore
                  and learn from.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default OurEvent;

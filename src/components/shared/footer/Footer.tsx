import { Box, Container, Grid, Typography } from "@mui/material";
import "./Footer.css";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MailIcon from "@mui/icons-material/Mail";

const Footer = () => {
  return (
    <Box className="footer_main">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} lg={3}>
            <h5 className="common_footer_title">Easy School</h5>
            <p className="common_footer_para">
              Your hassle-free solution for school management. Simplify
              administration and enhance efficiency with us!
            </p>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <h5 className="common_footer_title">Useful Links</h5>
            <Box className="footer_item">
              <a
                href={"https://dhakaeducationboard.portal.gov.bd/"}
                target="_blank"
              >
                মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, ঢাকা
              </a>
              <a href={"https://www.dpe.gov.bd/"} target="_blank">
                প্রাথমিক শিক্ষা অধিদপ্তর
              </a>
              <a href={"https://nctb.gov.bd/"} target="_blank">
                এনসিটিবি
              </a>
              <a href={"https://bteb.gov.bd/"} target="_blank">
                বাংলাদেশ কারিগরি শিক্ষা বোর্ড
              </a>
              <a href={"https://moedu.gov.bd/"} target="_blank">
                {" "}
                শিক্ষা মন্ত্রণালয়
              </a>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <h5 className="common_footer_title">Explore</h5>
            <Box className="footer_item">
              <Link to={"/about-us"}>About us</Link>
              <Link to={"/festival"}>Festival photos</Link>
              <Link to={"/contact-us"}>Contact us</Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <h5 className="common_footer_title">Get in touch</h5>

            <Box className="contact_info">
              <Box className="call_icon">
                <AddIcCallIcon />
              </Box>
              <Typography
                sx={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}
                component={"h6"}
              >
                01711062807
              </Typography>
            </Box>
            <Box className="contact_info">
              <Box className="call_icon">
                <LocationOnOutlinedIcon />
              </Box>
              <Typography
                sx={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}
                component={"h6"}
              >
                Mirpur-1, Dhaka, Bangladesh
              </Typography>
            </Box>
            <Box className="contact_info">
              <Box className="call_icon">
                <MailIcon />
              </Box>
              <Typography
                sx={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}
                component={"h6"}
              >
                info@easyschool.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "14px",
            color: "#fff",
            fontWeight: "400",
            pt: 3,
          }}
          component={"p"}
        >
          @Copyright © “Easy School”   || All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

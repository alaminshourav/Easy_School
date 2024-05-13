import { Box, Container } from "@mui/material";
import "./Home.css";
import Banner from "../../../components/home/banner/Banner";
import Gallery from "../../../components/home/gallery/Gallery";
import OurEvent from "../../../components/home/event/OurEvent";
import CommonModal from "../../../components/home/modal/CommonModal";
import WelcomeSpeech from "../../../components/home/welcomeSpeech/WelcomeSpeech";

const Home = () => {
  return (
    <Box component={"main"} className="home_main">
      <Banner />
      <Container>
        <WelcomeSpeech />
        <Gallery />
        <OurEvent />
        <CommonModal />
      </Container>
    </Box>
  );
};

export default Home;

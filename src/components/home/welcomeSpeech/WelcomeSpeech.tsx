import { Grid } from "@mui/material";
import "./welcomeSpeech.css";
import image1 from "../../../assets/welcome_speech/school_wel.jpg";
import HomeNoticeBoard from "../noticeBoard/HomeNoticeBoard";

const WelcomeSpeech = () => {
  return (
    <div className="section_padding">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} lg={5} md={5}>
          <HomeNoticeBoard />
        </Grid>
        <Grid item xs={12} lg={7} md={7}>
          <h2 className="common_title">Welcome to Easy School</h2>
          <img src={image1} alt="" className="welcome_image" />
          <p className="common_para welcome_padding">
            Welcome to Easy School, a nurturing learning environment for
            students of all ages! Managed by our dedicated team, Easy School
            provides quality education with a focus on holistic development.
          </p>
          <p className="common_para welcome_padding">
            Established in 2023, Easy School has been a beacon of education
            excellence in our community. With a student body of [Number]
            students spanning from Nursery to [Highest Grade Level], we pride
            ourselves on offering a supportive and engaging learning
            environment.
          </p>
          <p className="common_para welcome_padding">
            Our website serves as a hub of information for students, parents,
            and teachers alike. Explore our Notice Board for updates on school
            events, and find helpful resources through our useful links section.
          </p>
          <p className="common_para welcome_padding">
            At Easy School, we're committed to fostering academic excellence,
            character development, and lifelong learning. Join us on this
            journey of discovery and growth!
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default WelcomeSpeech;

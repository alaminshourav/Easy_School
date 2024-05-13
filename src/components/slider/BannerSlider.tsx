import "./Slider.css";
import Slider from "react-slick";
import left from "../../assets/slider/arrows/left.png";
import right from "../../assets/slider/arrows/right.png";
import { Container } from "@mui/material";
import { useRef } from "react";
import { bannerData } from "../../util/bannerData";
type BannerDataType = {
  image: string;
};
const BannerSlider = () => {
  const sliderRef = useRef<any>(null);
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };
  return (
    <div>
      <Slider {...settings} ref={sliderRef}>
        {bannerData.map((item: BannerDataType) => (
          <div>
            <div
              style={{
                backgroundImage: `url(${item.image}),linear-gradient(rgba(128, 125, 125, 0.452), rgba(128, 125, 125, 0.452))`,
                width: "100%",
                height: "100vh",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                position: "relative",
                backgroundBlendMode: "overlay",
                zIndex: 1,
              }}
            >
              <Container>
                <div className="arrows_main">
                  <div
                    className="left_arrow"
                    onClick={() => sliderRef?.current?.slickPrev()}
                  >
                    <img src={right} alt="" />
                  </div>
                  <div className="right_arrow">
                    <img
                      src={left}
                      alt=""
                      onClick={() => sliderRef?.current?.slickNext()}
                    />
                  </div>
                </div>
              </Container>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;

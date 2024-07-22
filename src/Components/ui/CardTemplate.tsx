import templateOne from "../../assets/img/5f77c35b1fbf3d62b1ae2d66_1597080429139.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import Slider from "react-slick";
const CardTemplate = () => {

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  return (
    <Slider
      {...settings}
      className="relative  shadow-md rounded-xl w-full h-fit"
    >
      <div >
        <img
          src={templateOne}
          alt="card-image"
          className=" w-full h-full"
        />
      </div>
      <div>
        <img
          src={templateOne}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </div>
      <div >
        <img
          src={templateOne}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </div>
      <div >
        <img
          src={templateOne}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </div>
    </Slider>
  );
};

export default CardTemplate;

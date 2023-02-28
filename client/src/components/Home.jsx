import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css'

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000 // 3 seconds
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src="../pics/1.jpg" alt="Image 1" />
        </div>
        <div>
          <img src="https://i.ibb.co/4gyyHZq/27cdecf26ec2ba0e73fc28ff73b955deed67db07-1677068552.jpg" alt="Image 2" />
        </div>
        <div>
          <img src="https://i.ibb.co/Nrh2dHv/6a45272b7e841c93f80c3c075ed210db4288180f-1677415939.jpg" alt="Image 3" />
        </div>
        <div>
          <img src="https://i.ibb.co/8NRLML1/4dc241fe8ad0bcd85d606cfcdebdcefdaa50e2cf-1677416219.jpg" alt="Image 4" />
        </div>
        <div>
          <img src="https://i.ibb.co/Tc0DvRd/85d92c64e0eacc4fc17b7e5dd8d4f8cd71e4cc35-1677060885.jpg" alt="Image 5" />
        </div>
        <div>
          <img src="https://i.ibb.co/5KHhXG8/593a086075947974cfb75dcd8a1d133d065e9e28-1677425692.jpg" alt="Image 6" />
        </div>
      </Slider>
    </div>
  );
};

export default Home;

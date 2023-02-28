import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css'
import yek from '../pics/1.jpg'
import second from '../pics/2.jpg'
import third from '../pics/3.jpg'
import fourth from '../pics/4.jpg'
import fifth from '../pics/5.jpg'
import sixth from '../pics/6.jpg'
import seventh from '../pics/7.jpg'


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
          <img src={yek} alt="Image 1" />
        </div>
        <div>
          <img src={second} alt="Image 2" />
        </div>
        <div>
          <img src={third} alt="Image 3" />
        </div>
        <div>
          <img src={fourth} alt="Image 4" />
        </div>
        <div>
          <img src={fifth} alt="Image 5" />
        </div>
        <div>
          <img src={sixth} alt="Image 6" />
        </div>
        <div>
          <img src={seventh} alt="Image 7" />
        </div>
      </Slider>
    </div>
  );
};

export default Home;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Product from "./products/Product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import yek from "../pics/1.jpg";
import second from "../pics/2.jpg";
import third from "../pics/3.jpg";
import fourth from "../pics/4.jpg";
import fifth from "../pics/5.jpg";
import sixth from "../pics/6.jpg";
import seventh from "../pics/7.jpg";
import store1 from "./store1.jpg";
import store2 from "./store2.jpg";
import store3 from "./store3.jpg";
import store4 from "./store4.jpg";
import SelectedStore from './SelectedStore'

const Home = (props) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
  };

  const advertisedStoreIds = ["1677219896778", "1677227582495"];
  const handleStoreClick = async (storeId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/store/${storeId}`
      );
      const products = await response.json();
      navigate(`/store/${storeId}`, { state: { products } });
    } catch (error) {
      console.error(error);
    }
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
      <div >
        <div className="addvertized_stores">
          <img
            src={store1}
            alt={`Store ${advertisedStoreIds[0]}`}
            onClick={() => navigate(`/store/${advertisedStoreIds[0]}`)}
          />
          <img
            src={store2}
            alt={`Store ${advertisedStoreIds[1]}`}
            onClick={() => navigate(`/store/${advertisedStoreIds[1]}`)}
          />
          <img
            src={store3}
            alt={`Store ${advertisedStoreIds[2]}`}
            onClick={() => navigate(`/store/${advertisedStoreIds[2]}`)}
          />
          <img
            src={store4}
            alt={`Store ${advertisedStoreIds[3]}`}
            onClick={() => navigate(`/store/${advertisedStoreIds[3]}`)}
          />
        </div>
        {/* <Routes>
          
        </Routes> */}
      </div>
      {/* <div className="products-container">
        {products.map((product, index) => (
          <Product
            key={index}
            product={product}
            addToCart={addToCart}
            userData={userData}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Home;

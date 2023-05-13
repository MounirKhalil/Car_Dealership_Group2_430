import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import brand1 from "../../../img/brand1.png";
import brand2 from "../../../img/brand2.png";
import brand3 from "../../../img/brand3.png";
import brand5 from "../../../img/brand5.png";
import brand6 from "../../../img/brand6.png";
import brand7 from "../../../img/brand7.png";
import brand8 from "../../../img/brand8.png";


const SliderBrands = () => {
  const settings = {
   // dots: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10px',
    arrows:false,
  };
  const width=50;
  const height=60;
    return (
      <Slider {...settings}>
        <div>
         <img width={width} height={height} alt="brand1" src={brand1}  />
        </div>
        <div>
         <img width={width} height={height} alt="brand2" src={brand2} />
        </div>
        <div>
         <img width={60} height={70} alt="brand3" src={brand3} />
        </div>
        <div>
         <img width={width} height={height} alt="brand5" src={brand5}  />
        </div>
        <div>
         <img width={width} height={height} alt="brand6" src={brand6}  />
        </div>
        <div>
         <img width={width} height={height} alt="brand7" src={brand7}  />
        </div>
        <div>
         <img width={width} height={height} alt="brand8" src={brand8}  />
        </div>
      </Slider>
    );
};

export default SliderBrands;

import React from "react";
import "../styles/HomePage.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const settingsHeader = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 секунды
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <div className="container-home">
      <div className="header-home">
        <Slider {...settingsHeader} className="slider-container-header">
          <div className="slider-img-box-header">
            <img
              src="https://contently.net/wp-content/uploads/2022/05/tfc-self-review-1024x512.jpeg"
              alt=""
            />
          </div>
          <div className="slider-img-box-header">
            <img
              src="https://resources.clearvoice.com/wp-content/uploads/2020/06/06.26.20_Hero_1360x646.png"
              alt=""
            />
          </div>
          <div className="slider-img-box-header">
            <img
              src="https://uploads-ssl.webflow.com/5e9033e54576bc13f0b47167/606f2df1587cfc55f95d3abc_5-reason-why-you%27re-not-making-it-as.jpg"
              alt=""
            />
          </div>
          <div className="slider-img-box-header">
            <img
              src="https://consultport.com/wp-content/uploads/2021/03/104-012.01.png"
              alt=""
            />
          </div>
        </Slider>
      </div>

      <div className="promo-home">
        <h2 className="promo-home-text">
          Find the talent needed to get your business growing.
        </h2>
        <img
          src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1400,dpr_1.0/v1/attachments/generic_asset/asset/50218c41d277f7d85feeaf3efb4549bd-1599072608122/bg-signup-1400-x1.png"
          alt=""
        />
      </div>

      <Slider {...settings} className="slider-container">
        <div className="slider-img-box">
          <img
            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_450,dpr_1.0/v1/attachments/generic_asset/asset/d532c0ad4feed007b3899cebad595286-1599611560168/guide-digital-marketing-552-x2.png"
            alt=""
          />
          <div className="slide-info-text">
            <h3>Start an online business and work from home</h3>
            <p>A complete guide to starting a small business online</p>
          </div>
        </div>
        <div className="slider-img-box">
          <img
            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_450,dpr_1.0/v1/attachments/generic_asset/asset/d532c0ad4feed007b3899cebad595286-1599611560157/guide-start-online-business-552-x2.png"
            alt=""
          />
          <div className="slide-info-text">
            <h3>Digital marketing made easy</h3>
            <p>A practical guide to understand what is digital marketing</p>
          </div>
        </div>
        <div className="slider-img-box">
          <img
            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_320,dpr_1.0/v1/attachments/generic_asset/asset/f23a46693ef0e611430e232cbc989e2b-1617004615106/skydesigner.png"
            alt=""
          />
          <div className="slide-info-text">
            <h3>Create a logo for your business</h3>
            <p>A step-by-step guide to create a memorable business logo</p>
          </div>
        </div>
        <div className="slider-img-box">
          <img
            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_320,dpr_1.0/v1/attachments/generic_asset/asset/aa2ff6a65708e858cd563bedbc1f9e48-1617004762616/spickex.jpeg"
            alt=""
          />
          <div className="slide-info-text">
            <h3>Book trailer examples & How to make a book trailer</h3>
            <p>
              Read our guide on how to make a stunning book trailer for your new
              book.
            </p>
          </div>
        </div>
      </Slider>

      <div className="promo-home-bottom">
        <h2 className="promo-home-bottom-text">
          Make an incredible logo in minutes Pre-designed by top talent. Just
          add your touch.
        </h2>
        <img
          src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1160,dpr_1.0/v1/attachments/generic_asset/asset/b49b1963f5f9008f5ff88bd449ec18f7-1608035772453/logo-maker-banner-wide-desktop-1352-2x.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default HomePage;

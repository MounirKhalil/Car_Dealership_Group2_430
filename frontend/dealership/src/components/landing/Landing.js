import React from "react";
import "./Landing.css";
import hero_section_img from "../../img/herocar.png";
import brand1 from "../../img/brand1.png";
import brand2 from "../../img/brand2.png";
import brand3 from "../../img/brand3.png";
import brand4 from "../../img/brand4.png";
import brand5 from "../../img/brand5.png";
import brand6 from "../../img/brand6.png";
import brand7 from "../../img/brand7.png";
import brand8 from "../../img/brand8.png";
import calendericon from "../../img/calendericon.png";
import caricon from "../../img/caricon.png";
import locationicon from "../../img/locationicon.png";
import carmap from "../../img/car_map.png";
import pocket from "../../img/pocket.png";
import driver from "../../img/driver.png";
import hour from "../../img/hour.png";
import phone from "../../img/phone.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import SliderBrands from "./slider/SliderBrands";

function Landing() {
  const testimonials = [
    {
      name: "Mounir Khalil",
      title: "Formula One Champion",
      imageSrc: "/path/to/image1.jpg",
      text: '"My recent experience with Car&Go was exceptional, their team went above and beyond to find the perfect car for my needs."',
    },
    {
      name: "Islam Fares",
      title: "Founder and CEO of Fares Technologies",
      imageSrc: "/path/to/image2.jpg",
      text: '"I was thoroughly impressed with the high-quality inventory and professional service provided by Car&Go."',
    },
  ];
  return (
    <div className="Landing">
      <main className="App">
        <section className="hero">
          <div className="hero-text">
            <h2>
              We offer the best deals on new and used{" "}
              <span className="cars-text">cars</span>
            </h2>
            <p>Visit us today to find your dream cars.</p>
          </div>
          <img id="hero-image" src={hero_section_img} alt="Hero Section Car" />
        </section>

        <div className="SliderSection">
        <SliderBrands/>
        </div>
        
        <section className="features">
          <div className="feature">
            <h3>Large Inventory</h3>
            <p>We have a large selection of new and used cars. </p>
          </div>
          <div className="feature">
            <h3>Great Prices</h3>
            <p>We offer competitive pricing on all our vehicles.</p>
          </div>
          <div className="feature">
            <h3>Expert Service</h3>
            <p>Our service department is staffed with certified technicians.</p>
          </div>
        </section>
        <section className="CardSection">
          <h3>Book a test drive following these 3 steps</h3>
          <div>
            <ul className="ThreeCards">
              <li className="Card">
                <img src={locationicon} className="CardImage" />
                <h4>Choose location</h4>
                <p>Choose location of desired dealership branch</p>
              </li>
              <li className="Card">
                <img src={calendericon} className="CardImage" />
                <h4>Pick a date</h4>
                <p>Pick one of the available dates at your convenience</p>
              </li>
              <li className="Card">
                <img src={caricon} className="CardImage" />
                <h4>Select Car</h4>
                <p>Select one of many available cars you weish to test drive</p>
              </li>
            </ul>
          </div>
        </section>
        <div className="DealsContainer">
          <div className="DealsHero">
            <img src={carmap} className="DealsHeroImage" />
          </div>
          <section className="DealsSection">
            <h3>Drive in style for less with our rental deals</h3>
            <ul className="FourDeals">
              <li className="Deal">
                <img src={pocket} className="DealImage" />
                <div className="DealText">
                  <h4>Best price (Source: Trust Us)</h4>
                  <p>
                    Find a lower price and you will have the difference totally
                    refunded
                  </p>
                </div>
              </li>
              <li className="Deal">
                <img src={driver} className="DealImage" />
                <div className="DealText">
                  <h4>Expert driver</h4>
                  <p>
                    Need a driver? Our expert drivers are ready to assist you
                  </p>
                </div>
              </li>
              <li className="Deal">
                <img src={hour} className="DealImage" />
                <div className="DealText">
                  <h4>24-hour car delivery</h4>
                  <p>
                    We are ready to direclty deliver your car at anytime, day
                    and night.
                  </p>
                </div>
              </li>
              <li className="Deal">
                <img src={phone} className="DealImage" />
                <div className="DealText">
                  <h4>24/7 technical assistance</h4>
                  <p>Need help? Contact Car&Go, we are always available!</p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="icon-container">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="content">
              <h3>{testimonials[0].name}</h3>
              <h4>{testimonials[0].title}</h4>
              <p>{testimonials[0].text}</p>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="icon-container">
              <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <div className="content">
              <h3>{testimonials[1].name}</h3>
              <h4>{testimonials[1].title}</h4>
              <p>{testimonials[1].text}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Landing;

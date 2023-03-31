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

function Landing() {
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
       
        <div>
          <div className="slids-container">
          <div className="car-brands">
            <section className="banner">
              <article className="slides">
                <div className="slide">
                  <ul className="images">
                    <li>
                      <img src={brand1} className="image" />
                    </li>
                    <li>
                      <img src={brand2} className="image" />
                    </li>
                    <li>
                      <img src={brand3} className="image" />
                    </li>
                    <li>
                      <img src={brand4} className="image" />
                    </li>
                    <li>
                      <img src={brand5} className="image" />
                    </li>
                    <li>
                      <img src={brand6} className="image" />
                    </li>
                    <li>
                      <img src={brand7} className="image" />
                    </li>
                    <li>
                      <img src={brand8} className="image" />
                    </li>
                  </ul>
                </div>
                <div className="slide">
                  <ul className="images">
                    <li>
                      <img src={brand1} className="image" />
                    </li>
                    <li>
                      <img src={brand2} className="image" />
                    </li>
                    <li>
                      <img src={brand3} className="image" />
                    </li>
                    <li>
                      <img src={brand4} className="image" />
                    </li>
                    <li>
                      <img src={brand5} className="image" />
                    </li>
                    <li>
                      <img src={brand6} className="image" />
                    </li>
                    <li>
                      <img src={brand7} className="image" />
                    </li>
                    <li>
                      <img src={brand8} className="image" />
                    </li>
                  </ul>
                </div>
              </article>
            </section>
          </div>
        </div>
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
      </main>
    </div>
  );
}

export default Landing;

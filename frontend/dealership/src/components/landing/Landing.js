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
        <div>
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
      </main>
    </div>
  );
}

export default Landing;

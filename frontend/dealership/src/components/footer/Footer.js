import React from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.css'

function Footer() {
  return (
    <footer>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-T1ze72vSM5UQ2F3q3grgQssibS91xl/E+/10Yazvhb7yU4SZxuV7a4npnC4V7Jh8X/GWfA6LfjR6UDpN6VE5Ew==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <div className="footer-container">
        <div className="footer-item">
          <h1>Car&Go</h1>
          <ul>
            <li><a className='sub' href="#">Beirut, Lebanon</a></li>
            <li><a className='sub' href="#">+961 81 730 156</a></li>
          </ul>
        </div>
        <div className="footer-item">
          <h3>Our Products</h3>
          <ul>
            <li><a href="#">Career</a></li>
            <li><a href="#">Cars</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Priceline</a></li>
          </ul>
        </div>
        <div className="footer-item">
          <h3>Resources</h3>
          <ul>
            <li><a href="#">Download</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Guides</a></li>
            <li><a href="#">Partner Network</a></li>
            <li><a href="#">Cruises</a></li>
            <li><a href="#">Developer</a></li>
          </ul>
        </div>
        <div className="footer-item">
          <h3>About Car&Go</h3>
          <ul>
            <li><a href="#">Why Choose Car&Go</a></li>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Press Center</a></li>
            <li><a href="#">Advertise</a></li>
          </ul>
        </div>
        <div className="footer-item social">
          <h2>Follow Us</h2>
          <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-snapchat"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Car&Go, All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
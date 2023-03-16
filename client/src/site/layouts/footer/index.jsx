import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-info">
        <div className="container">
          <div className="footer-item">
            <div className="main-title">
              <h1>Contact Us</h1>
            </div>
            <ul className="personal-info">
              <li>
                <i className="fa-solid fa-location-dot"></i>Address: 44 New Design
                Street,
              </li>
              <li>
                <i className="fa fa-envelope"></i>
                Email:
                <a href="mailto:sales@hotelempire.com">info@themevessel.com</a>
              </li>
              <li>
                <i className="fa fa-phone"></i>
                Phone: <a href="tel:+55-417-634-7071">+0477 85X6 552</a>
              </li>
              <li>
                <i className="fa fa-fax"></i>
                Fax: +0477 85X6 552
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <div className="main-title">
              <h1>Booking</h1>
            </div>
            <ul className="personal-info">
              <li>
                <Link to="/rooms">Rooms & Suites</Link>
              </li>
              <li>
                <Link to="/restaurant">Restaurant</Link>
              </li>
              <li>
                <Link to="/hotel">Hotel</Link>
              </li>
              <li>
                <Link to="/facilities">Our Facilities</Link>
              </li>
              <li>
                <Link to="/rooms">Rooms</Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <div className="main-title">
              <h1>About</h1>
            </div>
            <ul className="personal-info">
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/blogs">Blog & Events</Link>
              </li>
              <li>
                <Link to="/booking">Booking</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <div className="main-title">
              <h1>Newsletter</h1>
            </div>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <form action="">
              <input placeholder="Your Email" type="text" />
              <button>
                <i className="fa fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="copy-right">
        <div className="container">
          <p>
            © 2021{" "}
            <a href="http://themevessel.com/" target="_blank">
              Theme Vessel
            </a>
            . All Rights Reserved.
          </p>
          <ul className="social-list">
            <li className="twitter-bg">
              <a href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li className="facebook-bg">
              <a href="#">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li className="pinterest-bg">
              <a href="#">
                <i className="fa-brands fa-pinterest"></i>
              </a>
            </li>
            <li className="google-bg">
              <a href="#">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
            </li>
            <li className="linkedin-bg">
              <a href="#">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

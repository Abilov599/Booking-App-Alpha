import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import SearchForm from "./../../components/search-form/index";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <main id="home">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hotel Alpha - Booking and Reservation</title>
      </Helmet>
      <section id="greeting">
        <div className="container">
          <div className="welcome">
            <h2>Welcome To Hotel Alpha</h2>
            <p>
              Lorem ipsum dolor sit amet, conconsectetuer adipiscing elit Lorem
              ipsum dolor sit amet, conconsectetuer
            </p>
            <Link to="/rooms">Get Started Now</Link>
          </div>
          <SearchForm />
        </div>
      </section>
    </main>
  );
};

export default Home;

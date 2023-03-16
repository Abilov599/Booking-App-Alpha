import React from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";
import logo from "../../../site/assets/images/logo/alpha-logo1.png";

const Aside = () => {
  return (
    <main id="aside">
      <nav>
        <div to="/" className="logo">
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>
        </div>
        <ul>
          <li>
            <NavLink to="/admin">
              <i className="fa-solid fa-house"></i>Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-users">
              <i className="fa-solid fa-users"></i>Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/hotel-rooms">
              <i className="fa-solid fa-hotel"></i>Hotel Rooms
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/bookings">
              <i className="fa-solid fa-book-open"></i>Bookings
            </NavLink>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export default Aside;

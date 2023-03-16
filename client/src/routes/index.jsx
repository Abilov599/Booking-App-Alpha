import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../site/pages/home";
import Rooms from "./../site/pages/rooms/index";
import SignIn from "./../site/pages/sign-in/index";
import SignUp from "./../site/pages/sign-up/index";
import SiteRoot from "./../site/root/index";

import AdminHome from "./../admin/pages/home/index";
import AdminRoot from "./../admin/root/index";
import Booking from "../site/pages/booking";
import NotFound from "../site/pages/error";
import AllUsers from "../admin/pages/all-users";
import BookingsAdmin from "../admin/pages/bookings";
import MyBookings from "../site/pages/my-bookings";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<SiteRoot />}>
        <Route index element={<Home />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="booking/:roomID/" element={<Booking />} />
        <Route path="bookings/:userID/" element={<MyBookings />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/admin" element={<AdminRoot />}>
        <Route index element={<AdminHome />} />
        <Route path="all-users" element={<AllUsers />} />
        <Route path="bookings" element={<BookingsAdmin />} />
      </Route>
    </Routes>
  );
};

export default Routing;

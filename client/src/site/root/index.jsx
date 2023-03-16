import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../layouts/footer";
import Header from "../layouts/header";

const SiteRoot = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default SiteRoot;

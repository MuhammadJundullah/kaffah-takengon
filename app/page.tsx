"use client";

import React from "react";
import Navbar from "./_components/Navbar";
import Content from "./_components/Content";
import Footer from "./_components/Footer";
import { SessionProvider } from "next-auth/react";

const homePage = () => {
  return (
    <SessionProvider>
      <Navbar></Navbar>
      <Content></Content>
      <Footer></Footer>
    </SessionProvider>
  );
};

export default homePage;

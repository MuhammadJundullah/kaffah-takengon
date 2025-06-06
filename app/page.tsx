"use client";

import React from "react";
import Navbar from "./_components/Navbar";
import Content from "./_components/Content";
import Footer from "./_components/Footer";
import { SessionProvider, useSession } from "next-auth/react";

const HomePage = () => {
  return (
    <SessionProvider>
      <Navbar></Navbar>
      <Content></Content>
      <Footer></Footer>
    </SessionProvider>
  );
};

export default HomePage;

"use client";

import React from "react";
import Navbar from "./_components/Navbar";
import Content from "./_components/Content";
import Footer from "./_components/Footer";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/");
    }
  }, [router]);
  return (
    <SessionProvider>
      <Navbar></Navbar>
      <Content></Content>
      <Footer></Footer>
    </SessionProvider>
  );
};

export default HomePage;

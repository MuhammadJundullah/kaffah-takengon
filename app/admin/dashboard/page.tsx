"use client"

import React from 'react'
import Navbar from '@/app/_components/Navbar'
import AdminContent from '@/app/_components/AdminContent'
import Footer from "@/app/_components/Footer";
import { SessionProvider } from "next-auth/react";

const adminDashboard = () => {
    return (
      <SessionProvider>
        <Navbar />
        <AdminContent />
        <Footer />
      </SessionProvider>
    );
}

export default adminDashboard 
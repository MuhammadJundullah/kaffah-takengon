"use client"

import React from 'react'
import Navbar from '@/app/_components/Navbar'
import AdminContent from '@/app/_components/AdminContent'
import { SessionProvider } from "next-auth/react";

const adminDashboard = () => {
    return (
        <SessionProvider>
          <Navbar/>
          <AdminContent/>
        </SessionProvider>
  )
}

export default adminDashboard 
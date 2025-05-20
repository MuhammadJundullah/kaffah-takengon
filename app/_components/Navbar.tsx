"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex sm:px-15 justify-between items-center bg-gray-500 p-4 text-white sm:text-2xl font-bold">
      <p>Kaffah Takengon</p>

      {status === "loading" ? (
        <p className="text-sm">...</p>
      ) : session?.user ? (
        <button onClick={() => signOut()} className="text-sm hover:underline">
          Logout
        </button>
      ) : (
        <Link href="/login" className="text-sm hover:underline">
          Login as administrator
        </Link>
      )}
    </div>
  );
};

export default Navbar;

"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex sm:px-15 justify-between items-center bg-gray-500 p-4 text-white sm:text-2xl font-bold">
      <p className="font-light">Kaffah Takengon</p>

      {session?.user ? (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            signOut();
          }}
          className="text-sm hover:underline hover:cursor-pointer">
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          className="text-sm hover:underline hover:cursor-pointer">
          Login as admin
        </Link>
      )}
    </div>
  );
};

export default Navbar;

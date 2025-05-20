"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { IoIosArrowBack } from "react-icons/io";
import ErrorMessage from "@/app/_components/ErrorMessage";
import { Suspense } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/admin/dashboard");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin/dashboard",
    });
  };

  return (
    <Suspense>
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 ">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl hover:underline">
              <Link
                href="/"
                className="flex items-center gap-3 justify-center my-7">
                <IoIosArrowBack />
                Kembali ke Dashboard
              </Link>
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-300">
              Silakan login untuk mengaudit data dan informasi dari Kaffah
              dengan mudah dan aman.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            {/* ⛔️ Ini dipisah ke komponen sendiri */}
            <ErrorMessage />

            <div className="py-5 sm:py-0 rounded-lg border border-gray-200">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full  p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
            </div>

            <div className="py-5 sm:py-0 rounded-lg border border-gray-200">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />
            </div>

            <div className="flex items-center justify-center py-5 ">
              <button
                type="submit"
                className="inline-block rounded-lg hover:cursor-pointer px-5 py-3 text-sm font-medium dark:text-white border dark:border-white ">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default LoginPage;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin/dashboard",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 ">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl hover:underline">
            <Link href="/" className="flex items-center gap-3 justify-center my-7">
            <IoIosArrowBack/>
              Kembali ke Dashboard
            </Link>
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-300">
            Silakan login untuk mengaudit data dan informasi dari Kaffah dengan
            mudah dan aman.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          {error && (
            <div className="text-red-500 text-sm">
              {error === "CredentialsSignin"
                ? "Terjadi kesalahan. Silakan coba lagi."
                : "Email atau password salah."}
            </div>
          )}

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative dark:border dark:border-gray-200 dark:rounded-md">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative dark:border dark:border-gray-200 dark:rounded-md">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-block rounded-lg underline  px-5 py-3 text-sm font-medium text-white">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

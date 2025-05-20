"use client"

import React from 'react'
import { useEffect, useState } from "react";

type KaffahData = {
  id: string;
  tahun: string;
  name: string;
  januari: string;
  februari: string;
  maret: string;
  april: string;
  mei: string;
  juni: string;
  juli: string;
  agustus: string;
  september: string;
  oktober: string;
  november: string;
  desember: string;
};

const Content = () => {
  const [originalData, setOriginalData] = useState<KaffahData[]>([]);
  const [kaffahData, setKaffahData] = useState<KaffahData[]>([]);

  const handleFilter = (selectedYear: string) => {
    if (selectedYear === "") {
      setKaffahData(originalData);
    } else {
      setKaffahData(originalData.filter((data) => data.tahun === selectedYear));
    }
  };

  const [originalKaffahData, setOriginalKaffahData] = useState<KaffahData[]>(
    []
  );
  const [tahunData, setTahunData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/kaffah", { cache: "no-store" });
      const data = await res.json();
      setKaffahData(data.kaffahData);
      setOriginalKaffahData(data.kaffahData);
      setOriginalData(data.kaffahData);
      setTahunData(data.tahunData);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen sm:p-4 text-black sm:m-10 mx-5">
      {/* <div className="min-h-screen justify-center items-center p-4 text-black dark:text-white  m-10"> */}
      <h1 className="text-lg my-5">Tabel Informasi Pembayaran Kaffah</h1>

      <div className="text-gray-500 dark:text-white sm:leading-10 leading-8 sm:text-medium md:text-medium">
        <p>Panduan : </p>
        <ul>
          <li>- Setiap edisi kaffah rilis setiap jumatnya.</li>
          <li>
            - Jika terdapat isi dari kolom bulan 1/4 artinya anda telah melunasi
            1 edisi kaffah dari 4 jumat dalam bulan tersebut.{" "}
          </li>
          <li>
            - Jika terdapat isi dari kolom bulan 4/4 artinya anda telah melunasi
            seluruh edisi kaffah dari 4 jumat dalam bulan tersebut.{" "}
          </li>
          <li>
            - Untuk mempermudah dalam pencarian data, anda dapat melakukan
            filterisasi data berdasarkan tahun.{" "}
          </li>
        </ul>
      </div>

      <div className="my-5">
        <form className="flex flex-col sm:flex-row items-center gap-4 my-5">
          {/* <label htmlFor="tahun" className="font-medium dark:text-white">
              Tahun:
            </label> */}
          <div className="relative w-full sm:w-auto">
            <select
              id="tahun"
              className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
              onChange={(e) => handleFilter(e.target.value)}>
              <option value="">Semua data</option>
              {tahunData.map((tahun) => (
                <option key={tahun} value={tahun}>
                  {tahun}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </form>
      </div>

      <div className="mx-auto mt-10">
        <div className="overflow-y-auto rounded-lg border border-gray-200 mb-10">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:bg-gray-700 text-sm dark:text-white">
            <thead className="ltr:text-center rtl:text-center">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  Tahun
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  Nama
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  Januari
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  Februari
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  Maret
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  April
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  Mei
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  Juni
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  Juli
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  Agustus
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  September
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  Oktober
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  November
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium ">
                  Desember
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {kaffahData.map((data) => (
                <tr key={data.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium  text-center">
                    {data.tahun}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium  text-center">
                    {data.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  text-center">
                    {data.januari}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  text-center">
                    {data.februari}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  text-center">
                    {data.maret}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  text-center">
                    {data.april}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  text-center">
                    {data.mei}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  text-center">
                    {data.juni}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  text-center">
                    {data.juli}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  text-center">
                    {data.agustus}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  text-center">
                    {data.september}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  text-center">
                    {data.oktober}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  text-center">
                    {data.november}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  text-center">
                    {data.desember}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Content
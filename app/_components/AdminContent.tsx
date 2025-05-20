"use client";

import React, { useEffect, useState } from "react";

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
  const [tahunData, setTahunData] = useState<string[]>([]);
  const [editedData, setEditedData] = useState<
    Record<string, Partial<KaffahData>>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/kaffah");
      const data = await res.json();
      setOriginalData(data.kaffahData);
      setKaffahData(data.kaffahData);
      setTahunData(data.tahunData);
    };
    fetchData();
  }, []);

  const handleChange = (id: string, field: keyof KaffahData, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));

    setKaffahData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = async () => {
    const updates = Object.entries(editedData);

    for (const [id, changes] of updates) {
      const original = originalData.find((item) => item.id === id);
      if (!original) continue;

      const fullUpdate = {
        januari: changes.januari ?? original.januari,
        februari: changes.februari ?? original.februari,
        maret: changes.maret ?? original.maret,
        april: changes.april ?? original.april,
        mei: changes.mei ?? original.mei,
        juni: changes.juni ?? original.juni,
        juli: changes.juli ?? original.juli,
        agustus: changes.agustus ?? original.agustus,
        september: changes.september ?? original.september,
        oktober: changes.oktober ?? original.oktober,
        november: changes.november ?? original.november,
        desember: changes.desember ?? original.desember,
      };

      await fetch(`/api/kaffah/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullUpdate),
      });
    }

    setEditedData({});
    alert("Data berhasil diupdate!");
  };
  

  const handleFilter = (selectedYear: string) => {
    if (selectedYear === "") {
      setKaffahData(originalData);
    } else {
      setKaffahData(originalData.filter((data) => data.tahun === selectedYear));
    }
  };

  const bulanList = [
    "januari",
    "februari",
    "maret",
    "april",
    "mei",
    "juni",
    "juli",
    "agustus",
    "september",
    "oktober",
    "november",
    "desember",
  ] as (keyof KaffahData)[];

  return (
    <div className="min-h-screen sm:p-4 text-black sm:m-10 mx-5">
      <h1 className="text-lg sm:my-5">Tabel Informasi Pembayaran Kaffah</h1>

      {/* Panduan */}
      <div className="text-gray-500 dark:text-slate-200 mb-5  sm:leading-10">
        <p>Panduan:</p>
        <ul>
          <li>- Setiap edisi kaffah rilis setiap jumatnya.</li>
          <li>
            - Jika kolom bulan 1/4 artinya anda telah melunasi 1 dari 4 edisi.
          </li>
          <li>- Kolom 4/4 artinya sudah lunas semua edisi di bulan itu.</li>
          <li>- Bisa filter berdasarkan tahun di bawah ini.</li>
        </ul>
      </div>

      {/* Filter Tahun */}
      <form className="flex flex-col sm:flex-row items-center gap-4 my-5">
        <label htmlFor="tahun" className="font-medium dark:text-white">
          Tahun:
        </label>
        <select
          id="tahun"
          className="w-full sm:w-auto px-4 py-2 border rounded-lg dark:text-white"
          onChange={(e) => handleFilter(e.target.value)}>
          <option value="">Semua data</option>
          {tahunData.map((tahun) => (
            <option key={tahun} value={tahun}>
              {tahun}
            </option>
          ))}
        </select>
      </form>

      {/* Tabel Editable */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 mt-10">
        <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-800 text-sm dark:text-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Tahun</th>
              <th className="px-4 py-2">Nama</th>
              {bulanList.map((bulan) => (
                <th key={bulan} className="px-4 py-2 capitalize">
                  {bulan}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {kaffahData.map((data) => (
              <tr key={data.id}>
                <td className="px-4 py-2 text-center">{data.tahun}</td>
                <td className="px-4 py-2 text-center">{data.name}</td>
                {bulanList.map((bulan) => (
                  <td key={bulan} className="px-2 py-1">
                    <input
                      type="text"
                      value={data[bulan] || ""}
                      onChange={(e) =>
                        handleChange(data.id, bulan, e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm dark:text-white"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tombol Save */}
      <div className="mt-6 text-right">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Content;

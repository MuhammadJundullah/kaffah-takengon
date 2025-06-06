"use client";

import React, { useEffect, useState } from "react";
import AddModal from "@/app/_components/AddModal";
import { KaffahData } from "@/lib/types";

const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
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

  const handleEdit = (data: any) => {
    setEditData(data);
    setIsModalOpen(true);
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

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    try {
      const res = await fetch(`/api/kaffah/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus data");
      }

      setKaffahData((prev: KaffahData[]) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err: any) {
      console.error("Error:", err.message);
      alert("Terjadi kesalahan saat menghapus data");
    }
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
      <h1 className="text-lg my-5">Tabel Informasi Pembayaran Kaffah</h1>

      {/* Panduan */}
      <div className="text-gray-500 dark:text-white mb-5 sm:leading-10 leading-8">
        <p>Panduan:</p>
        <ul>
          <li>- Setiap edisi kaffah rilis setiap jumatnya.</li>
          <li>
            - Jika kolom bulan 101 - 104 artinya anda telah melunasi kaffah dari
            edisi 101 sampai 104.
          </li>
          <li>
            - Biasanya setiap bulan ada yang rilis 4 edisi, ada yang 5 edisi.
          </li>
          <li>- Bisa filter berdasarkan tahun di bawah ini.</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <div>
          <div className="flex justify-start">
            <button
              onClick={() => setIsModalOpen(true)}
              className=" appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 hover:cursor-pointer">
              Tambah Data
            </button>
          </div>
        </div>

        <form className="flex flex-col sm:flex-row items-center gap-4">
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

      <div className="overflow-x-auto rounded-lg border border-gray-200 mt-10 sm:mb-10 mb-2">
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
              <th className="pl-18 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kaffahData.map((data) => (
              <tr key={data.id}>
                <td className="px-4 py-2 text-center">{data.tahun}</td>
                <td className="px-4 py-2 text-center min-w-[250px]">
                  {data.name}
                </td>

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
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(data.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Hapus
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(data)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:mt-6 mb-10 text-right">
        <button
          onClick={handleSave}
          className=" appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 hover:cursor-pointer">
          Save Changes
        </button>
      </div>

      <AddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={async () => {
          const res = await fetch("/api/kaffah");
          const data = await res.json();
          setOriginalData(data.kaffahData);
          setKaffahData(data.kaffahData);
          setTahunData(data.tahunData);
          setEditData(null);
        }}
        editData={editData}
      />
    </div>
  );
};

export default Content;

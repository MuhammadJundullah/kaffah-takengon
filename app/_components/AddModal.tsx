"use client";
import { useState } from "react";

export default function AddModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [newName, setNewName] = useState("");
  const [newTahun, setNewTahun] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/kaffah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, tahun: newTahun }),
    });
    setNewName("");
    setNewTahun("");
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-10 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Tambah Data Kaffah</h2>
        <div className="mb-4">
          <label htmlFor="nama">
            <span className="text-sm font-medium text-gray-700"> Nama </span>

            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3 py-2 w-full rounded border-gray-300 shadow-sm sm:text-sm"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Tahun</label>
          <input
            type="text"
            value={newTahun}
            onChange={(e) => setNewTahun(e.target.value)}
            className="px-3 py-2 w-full rounded border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded border">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}


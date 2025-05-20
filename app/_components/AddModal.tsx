"use client";
import { useState, useEffect } from "react";

type KaffahData = {
  id?: number;
  name: string;
  tahun: string;
};

export default function AddModal({
  isOpen,
  onClose,
  onSuccess,
  editData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: KaffahData | null;
}) {
  const [formData, setFormData] = useState<KaffahData>({
    name: "",
    tahun: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        tahun: editData.tahun,
      });
    } else {
      setFormData({ name: "", tahun: "" });
    }
  }, [editData]);

  const handleSubmit = async () => {
    const url = editData ? `/api/kaffah/${editData.id}` : "/api/kaffah";
    const method = editData ? "PATCH" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({ name: "", tahun: "" });
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-10 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {editData ? "Edit Data Kaffah" : "Tambah Data Kaffah"}
        </h2>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Nama
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 px-3 py-2 w-full rounded border-gray-300 shadow-sm sm:text-sm"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Tahun</label>
          <input
            type="text"
            value={formData.tahun}
            onChange={(e) =>
              setFormData({ ...formData, tahun: e.target.value })
            }
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
            {editData ? "Update" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

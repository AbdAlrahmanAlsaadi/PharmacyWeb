import { useState } from "react";
import {
  FiBox,
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import MedicineDetailsModal from "../components/MedicineDetailsModal";
import AddMedicineForm from "../components/AddMedicineForm";
import useCategories from "../hooks/useCategories";
import useMedicines from "../hooks/useMedicines";

function MedicinesPage() {
    const [categoryId, setCategoryId] = useState("");
    const [search, setSearch] = useState("");
  const [showAddMedicine, setShowAddMedicine] = useState(false);
const [selectedMedicine, setSelectedMedicine] = useState(null);
 const {
  medicines,
  count,
  loading,
  error,
  fetchMedicines,
} = useMedicines(categoryId, search);
  const {
    categories,
    loading: categoriesLoading,
  } = useCategories();

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <FiBox size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Medicines
                </h1>

                <p className="text-sm text-slate-500">
                  Manage your warehouse medicines and inventory.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAddMedicine(true)}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 font-semibold text-white transition hover:bg-emerald-700"
          >
            <FiPlus size={19} />
            Add Medicine
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={19}
            />

            <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search medicines..."
  className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 outline-none focus:border-emerald-500"
                      />
            </div>

          <select
            value={categoryId}
            onChange={(event) =>
              setCategoryId(event.target.value)
            }
            disabled={categoriesLoading}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 outline-none focus:border-emerald-500"
          >
            <option value="">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.category}
              </option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Medicines
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-800">
            {count}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-slate-500">
            Loading medicines...
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Medicine
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Manufacturer
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Quantity
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Price
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Expiry Date
                                          </th>
                                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
    Actions
</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {medicines.map((medicine) => (
                    <tr
                      key={medicine.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {medicine.commercial_name}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {medicine.scientific_name}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                          {medicine.category?.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {medicine.manufacturer}
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {medicine.quantity}
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-700">
                        ${medicine.price}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {medicine.expiry_date}
                          </td>
                          <td className="px-6 py-4">
    <button
        onClick={() => setSelectedMedicine(medicine.id)}
        className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
    >
        <FiEye size={18} />
    </button>
</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!medicines.length && (
              <div className="p-10 text-center text-slate-500">
                No medicines found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Medicine Modal */}
      {showAddMedicine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5">
              <h2 className="text-xl font-bold text-slate-800">
                Add New Medicine
              </h2>

              <button
                onClick={() => setShowAddMedicine(false)}
                className="rounded-lg px-3 py-2 text-xl transition hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <AddMedicineForm
    onSuccess={()=>{
        setShowAddMedicine(false);
        fetchMedicines();
    }}
/>
            </div>
          </div>
        </div>
          )}
          {selectedMedicine && (
    <MedicineDetailsModal
        medicineId={selectedMedicine}
        onClose={() => setSelectedMedicine(null)}
    />
)}
    </>
  );
}

export default MedicinesPage;
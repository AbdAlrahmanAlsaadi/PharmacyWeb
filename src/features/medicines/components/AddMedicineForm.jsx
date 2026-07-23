import { useState } from "react";

import useCategories from "../hooks/useCategories";
import useCreateMedicine from "../hooks/useCreateMedicine";

function AddMedicineForm({ onSuccess }) {
    const {
    categories,
    loading: categoriesLoading,
  } = useCategories();

  const {
    addMedicine,
    loading: submitting,
    error,
  } = useCreateMedicine();

  const [formData, setFormData] = useState({
    scientific_name: "",
    commercial_name: "",
    category_id: "",
    manufacturer: "",
    quantity: "",
    price: "",
    expiry_date: "",
  });

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage("");

    try {
      const response = await addMedicine(formData);

        setSuccessMessage(response.message);
        if(onSuccess){
    onSuccess();
}

      setFormData({
        scientific_name: "",
        commercial_name: "",
        category_id: "",
        manufacturer: "",
        quantity: "",
        price: "",
        expiry_date: "",
      });
    } catch {
      // Error handled by hook
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Add New Medicine
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add a new medicine to your warehouse inventory.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Scientific Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Scientific Name
          </label>

          <input
            type="text"
            name="scientific_name"
            value={formData.scientific_name}
            onChange={handleChange}
            placeholder="e.g. Paracetamol"
            required
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        {/* Commercial Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Commercial Name
          </label>

          <input
            type="text"
            name="commercial_name"
            value={formData.commercial_name}
            onChange={handleChange}
            placeholder="e.g. Panadol"
            required
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Category
          </label>

          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            disabled={categoriesLoading}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          >
            <option value="">
              {categoriesLoading
                ? "Loading categories..."
                : "Select category"}
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

        {/* Manufacturer */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Manufacturer
          </label>

          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="Manufacturer name"
            required
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Quantity
          </label>

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            placeholder="0"
            required
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        {/* Price */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="0.00"
            required
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Expiry Date
          </label>

          <input
            type="date"
            name="expiry_date"
            value={formData.expiry_date}
            onChange={handleChange}
            required
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-600">
          {successMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="h-12 rounded-xl bg-emerald-600 px-8 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Adding Medicine..." : "Add Medicine"}
      </button>
    </form>
  );
}

export default AddMedicineForm;
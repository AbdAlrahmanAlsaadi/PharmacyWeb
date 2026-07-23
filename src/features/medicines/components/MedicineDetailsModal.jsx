import {
  FiBox,
  FiCalendar,
  FiDollarSign,
  FiPackage,
  FiTag,
  FiTruck,
  FiX,
} from "react-icons/fi";

import useMedicine from "../hooks/useMedicine";

function MedicineDetailsModal({ medicineId, onClose }) {
  const { medicine, loading, error } = useMedicine(medicineId);

  const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
          {icon}
        </div>

        <span className="text-sm font-medium text-slate-500">
          {label}
        </span>
      </div>

      <span className="text-right font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-emerald-100 p-4 text-emerald-600">
              <FiBox size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Medicine Details
              </h2>

              <p className="text-sm text-slate-500">
                Complete medicine information
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-red-500"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-10 text-center text-slate-500">
            Loading medicine...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-6">
            <div className="rounded-xl bg-red-50 p-4 text-red-600">
              {error}
            </div>
          </div>
        )}

        {/* Details */}
        {medicine && (
          <>
            <div className="grid gap-4 p-6 md:grid-cols-2">
              <DetailItem
                icon={<FiPackage size={18} />}
                label="Commercial Name"
                value={medicine.commercial_name}
              />

              <DetailItem
                icon={<FiTag size={18} />}
                label="Scientific Name"
                value={medicine.scientific_name}
              />

              <DetailItem
                icon={<FiTruck size={18} />}
                label="Manufacturer"
                value={medicine.manufacturer}
              />

              <DetailItem
                icon={<FiPackage size={18} />}
                label="Quantity"
                value={medicine.quantity}
              />

              <DetailItem
                icon={<FiDollarSign size={18} />}
                label="Price"
                value={`$${medicine.price}`}
              />

              <DetailItem
                icon={<FiCalendar size={18} />}
                label="Expiry Date"
                value={medicine.expiry_date}
              />
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 p-6">
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MedicineDetailsModal;
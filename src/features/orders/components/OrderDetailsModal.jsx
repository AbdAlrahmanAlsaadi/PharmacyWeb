import {
    FiCalendar,
    FiDollarSign,
    FiPackage,
    FiUser,
    FiX,
} from "react-icons/fi";

import useOrder from "../hooks/useOrder";

function OrderDetailsModal({ orderId, onClose }) {
    const { order, loading, error } = useOrder(orderId);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b p-5">
                    <h2 className="text-2xl font-bold">
                        Order #{orderId}
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-slate-100"
                    >
                        <FiX size={22} />
                    </button>
                </div>

                <div className="p-6">

                    {loading && (
                        <p>Loading...</p>
                    )}

                    {error && (
                        <p className="text-red-500">
                            {error}
                        </p>
                    )}

                    {order && (
                        <>
                            <div className="grid gap-4 md:grid-cols-2">

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <div className="mb-2 flex items-center gap-2 font-semibold">
                                        <FiUser />
                                        Pharmacist
                                    </div>

                                    {order.pharmacist.name}
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <div className="mb-2 flex items-center gap-2 font-semibold">
                                        <FiCalendar />
                                        Date
                                    </div>

                                    {order.created_at.substring(0, 10)}
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <div className="mb-2 flex items-center gap-2 font-semibold">
                                        <FiPackage />
                                        Status
                                    </div>

                                    {order.status}
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <div className="mb-2 flex items-center gap-2 font-semibold">
                                        <FiDollarSign />
                                        Total
                                    </div>

                                    ${order.total_price}
                                </div>

                            </div>

                            <div className="mt-8">

                                <h3 className="mb-4 text-lg font-bold">
                                    Medicines
                                </h3>

                                <div className="space-y-3">

                                    {order.items.map((item) => (

                                        <div
                                            key={item.id}
                                            className="rounded-xl border p-4"
                                        >
                                            <div className="flex justify-between">

                                                <div>
                                                    <p className="font-semibold">
                                                        {item.medicine.commercial_name}
                                                    </p>

                                                    <p className="text-sm text-slate-500">
                                                        Qty : {item.quantity}
                                                    </p>
                                                </div>

                                                <div className="font-bold text-emerald-600">
                                                    ${item.price}
                                                </div>

                                            </div>
                                        </div>

                                    ))}

                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">

                                <button
                                    onClick={onClose}
                                    className="rounded-xl bg-slate-900 px-6 py-3 text-white"
                                >
                                    Close
                                </button>

                            </div>

                        </>
                    )}

                </div>

            </div>
        </div>
    );
}

export default OrderDetailsModal;
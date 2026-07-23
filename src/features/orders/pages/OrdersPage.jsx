import { useState } from "react";
import {
  FiEye,
  FiPackage,
} from "react-icons/fi";
import {
  updateOrderStatus
} from "../api/orderApi";
import useOrders from "../hooks/useOrders";
import OrderDetailsModal from "../components/OrderDetailsModal";

function statusColor(status) {
  switch (status) {

    case "preparing":
      return "bg-yellow-100 text-yellow-700";

    case "sent":
      return "bg-blue-100 text-blue-700";

    case "received":
      return "bg-green-100 text-green-700";

    case "cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function paymentColor(status) {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-700";

    case "unpaid":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function OrdersPage() {
const {
  orders,
  setOrders,
  loading,
  error,
} = useOrders();
const [selectedOrder, setSelectedOrder] = useState(null);
const [statusOrder, setStatusOrder] = useState(null);
const handleStatusChange = async (id, status) => {
  try {

    await updateOrderStatus(id, status);

    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status: status,
            }
          : order
      )
    );

    setStatusOrder(null);

  } catch (error) {
    console.log(error);
  }



};
  return (
    <>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <FiPackage size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Orders
            </h1>

            <p className="text-sm text-slate-500">
              Manage pharmacy orders.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Orders
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-800">
            {orders.length}
          </p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-100 p-4 text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl bg-white p-10 text-center">
            Loading...
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

            <table className="w-full">

              <thead className="bg-slate-50">
                <tr>

                  <th className="px-5 py-4 text-left">
                    #
                  </th>

                  <th className="px-5 py-4 text-left">
                    Pharmacist
                  </th>

                  <th className="px-5 py-4 text-left">
                    Total
                  </th>

                  <th className="px-5 py-4 text-left">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left">
                    Payment
                  </th>

                  <th className="px-5 py-4 text-left">
                    Date
                  </th>

                  <th className="px-5 py-4 text-center">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-t"
                  >

                    <td className="px-5 py-4">
                      #{order.id}
                    </td>

                    <td className="px-5 py-4">
                      {order.pharmacist.name}
                    </td>

                    <td className="px-5 py-4">
                      ${order.total_price}
                    </td>

                <td className="px-5 py-4">

<span
className={`rounded-full px-3 py-1 text-sm ${statusColor(order.status)}`}
>
{order.status}
</span>

</td>

                    <td className="px-5 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-sm ${paymentColor(order.payment_status)}`}
                      >
                        {order.payment_status}
                      </span>

                    </td>

                    <td className="px-5 py-4">
                      {order.created_at.substring(0, 10)}
                    </td>

                <td className="px-5 py-4 text-center">

<div className="flex justify-center gap-2">

<button
onClick={() =>
setSelectedOrder(order.id)
}
className="rounded-lg bg-emerald-600 p-2 text-white hover:bg-emerald-700"
>
<FiEye />
</button>


{
order.status === "preparing" && (

<button
onClick={() =>
setStatusOrder(order.id)
}
className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
>
Update Status
</button>

)
}


</div>


{
statusOrder === order.id && (

<div className="mt-3">

<select
className="rounded-lg border px-3 py-2"
defaultValue=""
onChange={(e)=>
handleStatusChange(
order.id,
e.target.value
)
}
>

<option value="" disabled>
Choose Status
</option>

<option value="sent">
Sent
</option>

<option value="received">
Received
</option>

<option value="cancelled">
Cancelled
</option>

</select>

</div>

)

}

</td>

                  </tr>

                ))}

              </tbody>

            </table>

            {!orders.length && (
              <div className="p-8 text-center text-slate-500">
                No Orders Found.
              </div>
            )}

          </div>
        )}

      </div>

      {selectedOrder && (
        <OrderDetailsModal
          orderId={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}

export default OrdersPage;
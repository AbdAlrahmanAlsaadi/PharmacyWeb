import { useState } from "react";
import {
  FiEye,
  FiPackage,
  FiDownload,
} from "react-icons/fi";
import * as XLSX from "xlsx";

import {
  updateOrderStatus
} from "../api/orderApi";

import useOrders from "../hooks/useOrders";
import OrderDetailsModal from "../components/OrderDetailsModal";


function statusColor(status) {

  switch (status) {

    case "preparing":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";

    case "sent":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";

    case "received":
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";

    case "cancelled":
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";

    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
  }

}


function paymentColor(status) {

  switch (status) {

    case "paid":
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";

    case "unpaid":
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";

    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200";

  }

}



function OrdersPage() {


const {
  orders,
  setOrders,
  loading,
  error,
} = useOrders();


const [selectedOrder,setSelectedOrder] = useState(null);

const [statusOrder,setStatusOrder] = useState(null);

const exportExcel = () => {

  const data = orders.map((order)=>({
    ID: order.id,
    Pharmacist: order.pharmacist.name,
    Total: order.total_price,
    Status: order.status,
    Payment: order.payment_status,
    Date: order.created_at.substring(0,10),
  }));


  const worksheet = XLSX.utils.json_to_sheet(data);


  const workbook = XLSX.utils.book_new();


  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Orders"
  );


  XLSX.writeFile(
    workbook,
    "orders-report.xlsx"
  );

};

const handleStatusChange = async (id,status)=>{


  try {

    await updateOrderStatus(id,status);


    setOrders((prev)=>
      prev.map((order)=>
        order.id === id
        ? {
            ...order,
            status
          }
        :
          order
      )
    );


    setStatusOrder(null);


  } catch(error){

    console.log(error);

  }

};


return (

<div className="space-y-6">


{/* Header */}

<div className="flex items-center justify-between">


  <div className="flex items-center gap-3">


    <div
      className="
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-xl
      bg-emerald-100
      text-emerald-600
      dark:bg-emerald-900/40
      dark:text-emerald-300
      "
    >
      <FiPackage size={24}/>
    </div>


    <div>

      <h1
        className="
        text-2xl
        font-bold
        text-slate-800
        dark:text-white
        "
      >
        Orders
      </h1>


      <p
        className="
        text-sm
        text-slate-500
        dark:text-slate-400
        "
      >
        Manage pharmacy orders.
      </p>


    </div>


  </div>



  <button
    onClick={exportExcel}
    className="
    flex
    items-center
    gap-2
    rounded-xl
    bg-blue-600
    px-5
    py-3
    font-semibold
    text-white
    transition
    hover:bg-blue-700
    "
  >

    <FiDownload size={18}/>

    Export Excel

  </button>


</div>




{/* Stats */}

<div className="
rounded-2xl
border
border-slate-200
bg-white
p-5
shadow-sm
dark:border-slate-700
dark:bg-slate-900
">


<p className="
text-sm
text-slate-500
dark:text-slate-400
">
Total Orders
</p>


<p className="
mt-2
text-3xl
font-bold
text-slate-800
dark:text-white
">

{orders.length}

</p>


</div>





{error && (

<div className="
rounded-xl
bg-red-100
p-4
text-red-600
dark:bg-red-900/30
dark:text-red-300
">

{error}

</div>

)}





{
loading ?

<div className="
rounded-xl
bg-white
p-10
text-center
dark:bg-slate-900
dark:text-white
">

Loading...

</div>


:

<div className="
overflow-hidden
rounded-2xl
border
bg-white
shadow-sm
dark:border-slate-700
dark:bg-slate-900
">


<table className="
w-full
text-slate-800
dark:text-slate-200
">


<thead className="
bg-slate-50
dark:bg-slate-800
">


<tr>


{[
"#",
"Pharmacist",
"Total",
"Status",
"Payment",
"Date",
"Action"
].map((title)=>(

<th
key={title}
className="
px-5
py-4
text-left
text-sm
font-semibold
text-slate-700
dark:text-slate-200
"
>

{title}

</th>

))}


</tr>


</thead>





<tbody>


{
orders.map((order)=>(


<tr
key={order.id}
className="
border-t
border-slate-200
hover:bg-slate-50
dark:border-slate-700
dark:hover:bg-slate-800
transition
"
>



<td className="px-5 py-4">
#{order.id}
</td>



<td className="px-5 py-4">
{order.pharmacist.name}
</td>



<td className="px-5 py-4 font-semibold">
${order.total_price}
</td>





<td className="px-5 py-4">

<span
className={`
rounded-full
px-3
py-1
text-sm
${statusColor(order.status)}
`}
>

{order.status}

</span>


</td>





<td className="px-5 py-4">

<span
className={`
rounded-full
px-3
py-1
text-sm
${paymentColor(order.payment_status)}
`}
>

{order.payment_status}

</span>


</td>





<td className="px-5 py-4">

{order.created_at.substring(0,10)}

</td>






<td className="px-5 py-4">


<div className="flex justify-center gap-2">



<button

onClick={()=>setSelectedOrder(order.id)}

className="
rounded-lg
bg-emerald-600
p-2
text-white
hover:bg-emerald-700
"

>

<FiEye/>

</button>





{
order.status==="preparing" && (

<button

onClick={()=>setStatusOrder(order.id)}

className="
rounded-lg
bg-blue-600
px-3
py-2
text-sm
text-white
hover:bg-blue-700
"

>

Update Status

</button>

)

}



</div>






{
statusOrder===order.id && (

<div className="mt-3">


<select

className="
rounded-lg
border
bg-white
px-3
py-2
text-slate-800
dark:border-slate-600
dark:bg-slate-800
dark:text-white
"

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


))

}



</tbody>



</table>





{
!orders.length && (

<div className="
p-8
text-center
text-slate-500
dark:text-slate-400
">

No Orders Found.

</div>

)

}



</div>

}





{
selectedOrder && (

<OrderDetailsModal

orderId={selectedOrder}

onClose={()=>setSelectedOrder(null)}

/>

)

}



</div>


);


}


export default OrdersPage;
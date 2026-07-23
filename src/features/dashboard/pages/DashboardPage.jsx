import {
  FiPackage,
  FiBox,
  FiDollarSign,
  FiClock
} from "react-icons/fi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";


const stats = [
  {
    title:"Total Orders",
    value:245,
    icon:FiPackage,
    color:"bg-emerald-100 text-emerald-600"
  },
  {
    title:"Medicines",
    value:530,
    icon:FiBox,
    color:"bg-blue-100 text-blue-600"
  },
  {
    title:"Revenue",
    value:"$25,400",
    icon:FiDollarSign,
    color:"bg-yellow-100 text-yellow-600"
  },
  {
    title:"Pending Orders",
    value:34,
    icon:FiClock,
    color:"bg-red-100 text-red-600"
  }
];


const ordersData = [
  {
    day:"Mon",
    orders:12
  },
  {
    day:"Tue",
    orders:25
  },
  {
    day:"Wed",
    orders:18
  },
  {
    day:"Thu",
    orders:32
  },
  {
    day:"Fri",
    orders:40
  }
];


const statusData=[
  {
    name:"Preparing",
    value:40
  },
  {
    name:"Sent",
    value:30
  },
  {
    name:"Received",
    value:25
  },
  {
    name:"Cancelled",
    value:5
  }
];


const medicines=[
 {
  name:"Panadol",
  quantity:120
 },
 {
  name:"Vitamin C",
  quantity:90
 },
 {
  name:"Aspirin",
  quantity:70
 },
 {
  name:"Omega 3",
  quantity:50
 }
];


const colors=[
 "#10b981",
 "#3b82f6",
 "#f59e0b",
 "#ef4444"
];


function DashboardPage(){

return (

<div className="space-y-6">


<h1 className="text-2xl font-bold text-slate-800">
Dashboard
</h1>



{/* Cards */}

<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

{
stats.map((item)=>{

const Icon=item.icon;

return (

<div
key={item.title}
className="rounded-2xl bg-white p-5 shadow-sm border"
>

<div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
<Icon size={24}/>
</div>


<p className="mt-4 text-sm text-slate-500">
{item.title}
</p>


<h2 className="mt-1 text-3xl font-bold text-slate-800">
{item.value}
</h2>


</div>

)

})
}


</div>



<div className="grid gap-6 lg:grid-cols-2">


{/* Orders Chart */}

<div className="rounded-2xl bg-white p-5 shadow-sm border">

<h2 className="mb-5 font-bold">
Orders Overview
</h2>


<ResponsiveContainer width="100%" height={300}>

<LineChart data={ordersData}>

<XAxis dataKey="day"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="orders"
stroke="#10b981"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>


</div>





{/* Status */}

<div className="rounded-2xl bg-white p-5 shadow-sm border">

<h2 className="mb-5 font-bold">
Order Status
</h2>


<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie
data={statusData}
dataKey="value"
nameKey="name"
outerRadius={100}
>

{
statusData.map((entry,index)=>(

<Cell
key={index}
fill={colors[index]}
/>

))
}

</Pie>


<Tooltip/>

</PieChart>

</ResponsiveContainer>


</div>



</div>





{/* Top Medicines */}

<div className="rounded-2xl bg-white p-5 shadow-sm border">

<h2 className="mb-5 font-bold">
Top Medicines
</h2>


<ResponsiveContainer width="100%" height={300}>


<BarChart data={medicines}>


<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>


<Bar
dataKey="quantity"
fill="#10b981"
/>


</BarChart>


</ResponsiveContainer>


</div>



</div>

)

}


export default DashboardPage;
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
    color:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
  },
  {
    title:"Medicines",
    value:530,
    icon:FiBox,
    color:"bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
  },
  {
    title:"Revenue",
    value:"$25,400",
    icon:FiDollarSign,
    color:"bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400"
  },
  {
    title:"Pending Orders",
    value:34,
    icon:FiClock,
    color:"bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
  }
];


const ordersData = [
  {day:"Mon",orders:12},
  {day:"Tue",orders:25},
  {day:"Wed",orders:18},
  {day:"Thu",orders:32},
  {day:"Fri",orders:40}
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

<div className="space-y-8">


{/* Header */}

<div>

<h1 className="
text-3xl
font-bold
text-slate-800
dark:text-white
">
Dashboard
</h1>

<p className="
mt-2
text-slate-500
dark:text-slate-400
">
Warehouse overview and statistics
</p>

</div>



{/* Cards */}

<div className="
grid
gap-5
sm:grid-cols-2
xl:grid-cols-4
">


{
stats.map((item)=>{

const Icon=item.icon;

return (

<div
key={item.title}
className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
transition
hover:-translate-y-1
hover:shadow-lg
dark:border-slate-700
dark:bg-slate-800
"
>


<div className={`
flex
h-14
w-14
items-center
justify-center
rounded-2xl
${item.color}
`}>

<Icon size={26}/>

</div>



<p className="
mt-5
text-sm
font-medium
text-slate-500
dark:text-slate-400
">

{item.title}

</p>


<h2 className="
mt-2
text-3xl
font-bold
text-slate-800
dark:text-white
">

{item.value}

</h2>


</div>

)

})

}


</div>





<div className="
grid
gap-6
lg:grid-cols-2
">


{/* Orders Chart */}

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
dark:border-slate-700
dark:bg-slate-800
">


<h2 className="
mb-6
text-xl
font-bold
text-slate-800
dark:text-white
">

Orders Overview

</h2>



<ResponsiveContainer width="100%" height={320}>

<LineChart data={ordersData}>


<XAxis
dataKey="day"
stroke="#94a3b8"
/>


<YAxis
stroke="#94a3b8"
/>


<Tooltip
contentStyle={{
background:"#1e293b",
border:"none",
borderRadius:"12px",
color:"#fff"
}}
/>



<Line
type="monotone"
dataKey="orders"
stroke="#10b981"
strokeWidth={4}
dot={{
r:5,
fill:"#10b981"
}}
/>



</LineChart>


</ResponsiveContainer>


</div>







{/* Status */}

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
dark:border-slate-700
dark:bg-slate-800
">


<h2 className="
mb-6
text-xl
font-bold
text-slate-800
dark:text-white
">

Order Status

</h2>



<ResponsiveContainer width="100%" height={320}>


<PieChart>


<Pie
data={statusData}
dataKey="value"
nameKey="name"
outerRadius={110}
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


<Tooltip
contentStyle={{
background:"#1e293b",
border:"none",
borderRadius:"12px",
color:"#fff"
}}
/>


</PieChart>


</ResponsiveContainer>


</div>



</div>







{/* Top Medicines */}


<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
dark:border-slate-700
dark:bg-slate-800
">


<h2 className="
mb-6
text-xl
font-bold
text-slate-800
dark:text-white
">

Top Medicines

</h2>



<ResponsiveContainer width="100%" height={320}>


<BarChart data={medicines}>


<XAxis
dataKey="name"
stroke="#94a3b8"
/>


<YAxis
stroke="#94a3b8"
/>


<Tooltip
contentStyle={{
background:"#1e293b",
border:"none",
borderRadius:"12px",
color:"#fff"
}}
/>



<Bar
dataKey="quantity"
fill="#10b981"
radius={[10,10,0,0]}
/>



</BarChart>


</ResponsiveContainer>


</div>



</div>

)

}


export default DashboardPage;
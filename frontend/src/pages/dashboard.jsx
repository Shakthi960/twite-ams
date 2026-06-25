// import { useEffect, useState } from "react";
// import Navbar from "../components/navbar";
// import api from "../api/axios";
// import {
//   Pie
// } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from "chart.js";

// import {
//     Bar
// } from "react-chartjs-2";

// import {
//     CategoryScale,
//     LinearScale,
//     BarElement
// } from "chart.js";

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement
// );

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend
// );

// function Dashboard() {

//   console.log("Dashboard Loaded");

//   const [departmentData, setDepartmentData] = useState([]);

//   const [summary, setSummary] = useState({
//     totalEmployees: 0,
//     present: 0,
//     absent: 0,
//   });

//   useEffect(() => {
//   loadSummary();
// }, []);

// const loadSummary = async () => {

//   try {

//     const res = await api.get("/dashboard");

//     console.log(res.data);

//     setSummary({

//       totalEmployees: res.data.totalEmployees,

//       present: res.data.presentToday,

//       absent: res.data.absentToday

//     });

//     setDepartmentData(
//       res.data.departmentWise
//     );

//   } catch (err) {

//     console.log(err);

//   }

// };

//   const pieData = {

//   labels: [
//     "Present",
//     "Absent"
//   ],

//   datasets: [

//     {

//       data: [

//         summary.present,

//         summary.absent

//       ],

//       backgroundColor: [

//         "#7D2AE8",

//         "#ff6b6b"

//       ],

//       borderWidth: 1

//     }

//   ]

// };

// const barData = {

//   labels: departmentData.map(
//     item => item.department
//   ),

//   datasets: [

//     {

//       label: "Employees",

//       data: departmentData.map(
//         item => item.count
//       ),

//       backgroundColor: "#7D2AE8"

//     }

//   ]

// };

//   return (
//     <>
//       <Navbar />

//       <div className="container mt-4">

//         <h1>Dashboard</h1>

//         <div className="row">

//           <div className="col-md-4">
//             <div className="stat-card">
//               <h5>Total Employees</h5>
//               <h2>
//                 {summary.totalEmployees}
//               </h2>
//             </div>
//           </div>

//           <div className="col-md-4">
//             <div className="stat-card">
//               <h5>Present</h5>
//               <h2>
//                 {summary.present}
//               </h2>
//             </div>
//           </div>

//           <div className="col-md-4">
//             <div className="stat-card">
//               <h5>Absent</h5>
//               <h2>
//                 {summary.absent}
//               </h2>
//             </div>
//           </div>

//         </div>

//       </div>
//       <div className="card mt-4 p-4">

//     <h4 className="mb-3">
//         Attendance Overview
//     </h4>

//     <div
//         style={{
//             width:"350px",
//             margin:"auto"
//         }}
//     >

//         <Pie data={pieData}/>

//     </div>

// <div className="card mt-4 p-4">

// <h4 className="mb-3">
//     Employees by Department
// </h4>

// <div
//   style={{
//     height: "300px",
//     width: "50%"
//   }}
// >
//   <Bar
//     data={barData}
//     options={{
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           display: false
//         }
//       },
//       scales: {
//         y: {
//           beginAtZero: true,
//           ticks: {
//             stepSize: 1
//           }
//         }
//       }
//     }}
//   />
// </div>

// </div>
// </div>


//     </>
//   );
// }

// export default Dashboard;

function Dashboard() {
  return (
    <div>
      <h1>Dashboard Works</h1>
    </div>
  );
}

export default Dashboard;

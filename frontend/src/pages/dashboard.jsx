import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import api from "../api/axios";

function Dashboard() {

  console.log("Dashboard Loaded");

  const [summary, setSummary] = useState({
    totalEmployees: 0,
    present: 0,
    absent: 0,
  });

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const res = await api.get("/dashboard");
      setSummary({
        totalEmployees: res.data.totalEmployees,
        present: res.data.presentToday,
        absent: res.data.absentToday,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h1>Dashboard</h1>

        <div className="row">

          <div className="col-md-4">
            <div className="stat-card">
              <h5>Total Employees</h5>
              <h2>
                {summary.totalEmployees}
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card">
              <h5>Present</h5>
              <h2>
                {summary.present}
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card">
              <h5>Absent</h5>
              <h2>
                {summary.absent}
              </h2>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;
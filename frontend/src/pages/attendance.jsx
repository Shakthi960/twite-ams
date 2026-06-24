import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/navbar";

function Attendance() {

  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [form, setForm] = useState({
        employee_id: "",
        attendance_date:
            new Date().toLocaleDateString("en-CA"),
        attendance_status: "Present"
    });

  useEffect(() => {
    loadAttendance();
    loadEmployees();
  }, []);

  const loadAttendance = async () => {
    try {
      const res = await api.get("/attendance");
      setRecords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data.employees);
    } catch (err) {
      console.log(err);
    }
  };

  const markAttendance = async () => {

    try {

      const currentTime =
        new Date()
          .toLocaleTimeString(
            "en-GB",
            {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
            }
          );

      await api.post(
        "/attendance",
        {
            ...form,

            check_in:
            form.attendance_status === "Present"
                ? currentTime
                : null,

            check_out: null
        }
        );

      setMessage(
        "Attendance Marked Successfully"
      );

      loadAttendance();

      setForm({
        employee_id: "",
        attendance_date: new Date()
          .toISOString()
          .split("T")[0],
        attendance_status: "Present"
      });

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (err) {

  console.log(err.response?.data);

  setAlertType("danger");

  setMessage(
    err.response?.data?.message ||
    "Failed to mark attendance"
  );
}
  };

  const checkOut = async (
    attendanceId
  ) => {

    try {

      const currentTime =
        new Date()
          .toLocaleTimeString(
            "en-GB",
            {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
            }
          );

      await api.put(
        `/attendance/${attendanceId}`,
        {
          check_out:
            currentTime
        }
      );

      loadAttendance();

      setAlertType("info");

        setMessage(
        "Checked Out Successfully"
        );

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h1>
          Attendance Management
        </h1>

        {message && (
          <div className={`alert alert-${alertType}`}>
            {message}
          </div>
        )}

        <div className="card p-3 mb-4">

          <h4>
            Mark Attendance
          </h4>

          <select
            className="form-control mb-2"
            value={form.employee_id}
            onChange={(e) =>
              setForm({
                ...form,
                employee_id:
                  e.target.value
              })
            }
          >

            <option value="">
              Select Employee
            </option>

            {employees.map((emp) => (

              <option
                key={emp.employee_id}
                value={emp.employee_id}
              >
                {emp.employee_name}
              </option>

            ))}

          </select>

          <input
            type="date"
            className="form-control mb-2"
            value={form.attendance_date}
            readOnly
          />

          <select
            className="form-control mb-2"
            value={
              form.attendance_status
            }
            onChange={(e) =>
              setForm({
                ...form,
                attendance_status:
                  e.target.value
              })
            }
          >

            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>

          </select>

          <button
            className="btn btn-success"
            onClick={markAttendance}
          >
            Mark Attendance
          </button>

        </div>

        <table className="table table-bordered">

          <thead>

            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {records.map((r) => (

              <tr
                key={r.attendance_id}
              >

                <td>
                  {r.attendance_id}
                </td>

                <td>
                  {r.employee_name}
                </td>

                <td>
                  {r.attendance_date}
                </td>

                <td>
                  {r.check_in}
                </td>

                <td>
                    {r.check_out &&
                    r.check_out !== "None"
                        ? r.check_out
                        : "-"
                    }
                </td>

                <td>
                  {r.attendance_status}
                </td>

                <td>

                    {r.attendance_status === "Absent" ? (

                    <span className="text-danger fw-bold">
                        Absent
                    </span>

                    ) : r.check_out &&
     r.check_out !== "None" ? (

                    <span className="text-success fw-bold">
                        Completed
                    </span>

                    ) : (

                    <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                        checkOut(r.attendance_id)
                        }
                    >
                        Check Out
                    </button>

                    )}

                    </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );

}



export default Attendance;
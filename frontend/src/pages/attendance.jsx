import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/navbar";

function Attendance() {

  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("attendance_id");
const [sortOrder, setSortOrder] = useState("asc");
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);

const perPage = 5;

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
  }, [page]);

  const loadAttendance = async () => {

  const res = await api.get(
    `/attendance?page=${page}&per_page=${perPage}`
  );

  setRecords(
    res.data.attendance
  );

  setTotal(
    res.data.total
  );

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

  const exportCSV = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
"https://twite-ams.onrender.com/attendance/export",

        {

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );

    const blob =
      await response.blob();

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "attendance_report.csv";

    link.click();

    window.URL.revokeObjectURL(
      url
    );

  }

  catch (err) {

    console.log(err);

  }

};


  const handleSort = (field) => {

  if (sortField === field) {

    setSortOrder(
      sortOrder === "asc"
        ? "desc"
        : "asc"
    );

  } else {

    setSortField(field);

    setSortOrder("asc");

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

        <div className="mb-3">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by Employee, Date or Status"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="d-flex justify-content-end mb-3">

          <button

            className="btn btn-success"

            onClick={exportCSV}

          >

            Export CSV

          </button>

        </div>

        <table className="table table-bordered">

          <thead>
            <p>"click Column names for sorting"</p>
            <tr>
              <th
style={{cursor:"pointer"}}
onClick={()=>handleSort("attendance_id")}
>
ID
{sortField==="attendance_id"
? (sortOrder==="asc"
? " ▲"
: " ▼")
: ""}
</th>
              <th
style={{cursor:"pointer"}}
onClick={()=>handleSort("employee_name")}
>
Employee
{sortField==="employee_name"
? (sortOrder==="asc"
? " ▲"
: " ▼")
: ""}
</th>
              <th
style={{cursor:"pointer"}}
onClick={()=>handleSort("attendance_date")}
>
Date
{sortField==="attendance_date"
? (sortOrder==="asc"
? " ▲"
: " ▼")
: ""}
</th>
              <th
style={{cursor:"pointer"}}
onClick={()=>handleSort("check_in")}
>
Check In
{sortField==="check_in"
? (sortOrder==="asc"
? " ▲"
: " ▼")
: ""}
</th>
              <th
style={{cursor:"pointer"}}
onClick={()=>handleSort("check_out")}
>
Check Out
{sortField==="check_out"
? (sortOrder==="asc"
? " ▲"
: " ▼")
: ""}
</th>
              <th
style={{cursor:"pointer"}}
onClick={()=>handleSort("attendance_status")}
>
Status
{sortField==="attendance_status"
? (sortOrder==="asc"
? " ▲"
: " ▼")
: ""}
</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {records

.filter((r) =>

    r.employee_name
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    r.attendance_date
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    r.attendance_status
      .toLowerCase()
      .includes(search.toLowerCase())

)

.sort((a,b)=>{

    let valueA=a[sortField];
    let valueB=b[sortField];

    if(typeof valueA==="string"){

        valueA=valueA.toLowerCase();
        valueB=valueB.toLowerCase();

    }

    if(sortOrder==="asc"){

        return valueA>valueB?1:-1;

    }

    return valueA<valueB?1:-1;

})

.map((r)=>(

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

        <div className="d-flex justify-content-between align-items-center mt-3">

  <button
    className="btn btn-secondary"
    disabled={page === 1}
    onClick={() =>
      setPage(page - 1)
    }
  >
    Previous
  </button>

  <span>

    Page {page} of {

      Math.ceil(
        total / perPage
      )

    }

  </span>

  <button
    className="btn btn-secondary"
    disabled={
      page >=
      Math.ceil(total / perPage)
    }
    onClick={() =>
      setPage(page + 1)
    }
  >
    Next
  </button>

</div>

      </div>
    </>
  );

}



export default Attendance;
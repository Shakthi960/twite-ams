import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import api from "../api/axios";

function Employees() {
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("employee_id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  const perPage = 5;

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] = useState({
    employee_name: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
    status: "Active",
  });

  useEffect(() => {
    loadEmployees();
  }, [page, department, status]);

  const loadEmployees = async () => {

  const res = await api.get(
    `/employees?page=${page}&per_page=${perPage}&department=${department}&status=${status}`
  );

  setEmployees(
    res.data.employees
  );

  setTotal(
    res.data.total
  );

};

  const saveEmployee = async () => {

  try {

    if (editingId) {

      await api.put(
        `/employees/${editingId}`,
        form
      );

      setAlertType("info");

      setMessage(
        "Employee Updated Successfully"
      );

    } else {

      await api.post(
        "/employees",
        form
      );

      setAlertType("success");

      setMessage(
        "Employee Added Successfully"
      );
    }

    clearForm();

    loadEmployees();

  } catch (err) {

    setAlertType("danger");

    setMessage(
      err.response?.data?.message ||
      "Operation Failed"
    );
  }

  setTimeout(() => {
    setMessage("");
  }, 3000);
};

  const editEmployee = (emp) => {

  setEditingId(emp.employee_id);

  setForm({
    employee_name: emp.employee_name,
    email: emp.email,
    mobile: emp.mobile,
    department: emp.department,
    designation: emp.designation,
    status: emp.status,
  });

  setMessage("Employee loaded for editing");
};

  const deleteEmployee = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

    await api.delete(
      `/employees/${id}`
    );

    setAlertType("success");

    setMessage(
      "Employee deleted successfully"
    );

    loadEmployees();

    setTimeout(() => {
      setMessage("");
    }, 3000);

  } catch (err) {

    setAlertType("danger");

    setMessage(
      err.response?.data?.message ||
      "Failed to delete employee"
    );

  }

};

  const clearForm = () => {

    setEditingId(null);

    setForm({
      employee_name: "",
      email: "",
      mobile: "",
      department: "",
      designation: "",
      status: "Active",
    });
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

        <h1>Employee Management</h1>

        {message && (
        <div className={`alert alert-${alertType}`}>
            {message}
        </div>
        )}
        

        <div className="card p-3 mb-4">

          <input
            className="form-control mb-2"
            placeholder="Employee Name"
            value={form.employee_name}
            onChange={(e) =>
              setForm({
                ...form,
                employee_name:
                  e.target.value,
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) =>
              setForm({
                ...form,
                mobile:
                  e.target.value,
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department:
                  e.target.value,
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Designation"
            value={form.designation}
            onChange={(e) =>
              setForm({
                ...form,
                designation:
                  e.target.value,
              })
            }
          />

          <button
            className={
              editingId
                ? "btn btn-warning"
                : "btn btn-success"
            }
            onClick={saveEmployee}
          >
            {
              editingId
                ? "Update Employee"
                : "Add Employee"
            }
          </button>

        </div>


            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search by Name, Email or Department"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

                <div className="row mb-3">

                  <div className="col-md-4">

                    <select
                      className="form-select"
                      value={department}
                      onChange={(e) => {

                        setDepartment(
                          e.target.value
                        );

                        setPage(1);

                      }}
                    >

                      <option value="">
                        All Departments
                      </option>

                      <option value="GenAI">
                        GenAI
                      </option>

                      <option value="HR">
                        HR
                      </option>

                      <option value="Software Developer">
                        Software Developer
                      </option>

                      <option value="Sales">
                        Sales
                      </option>

                      <option value="UIUX">
                        UIUX
                      </option>

                    </select>

                  </div>
                  <div className="col-md-4">

  <select
    className="form-select"
    value={status}
    onChange={(e) => {

      setStatus(
        e.target.value
      );

      setPage(1);

    }}
  >

    <option value="">
      All Status
    </option>

    <option value="Active">
      Active
    </option>

    <option value="Inactive">
      Inactive
    </option>

  </select>

</div>

                </div>

        <table className="table table-bordered">
                
          <thead>
            <p>"click Column names for sorting"</p>
            <tr>
              <th
style={{cursor:"pointer"}}
onClick={()=>handleSort("employee_id")}
>
ID{sortField==="employee_id"
? (sortOrder==="asc" ? "▲" : "▼")
: ""}
</th>
              <th
style={{cursor:"pointer"}}
onClick={()=>handleSort("employee_name")}
>
Name {sortField==="employee_name"
? (sortOrder==="asc" ? "▲" : "▼")
: ""}
</th>
              <th
style={{cursor:"pointer"}}
onClick={()=>handleSort("email")}
>
Email{sortField==="email"
? (sortOrder==="asc" ? "▲" : "▼")
: ""}
</th>
              <th
style={{cursor:"pointer"}}
onClick={()=>handleSort("department")}
>
Department{sortField==="department"
? (sortOrder==="asc" ? "▲" : "▼")
: ""}
</th>
              <th
style={{cursor:"pointer"}}
onClick={()=>handleSort("designation")}
>
Designation{sortField==="designation"
? (sortOrder==="asc" ? "▲" : "▼")
: ""}
</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {employees

            .filter((emp) =>

                emp.employee_name
                  .toLowerCase()
                  .includes(search.toLowerCase())

                ||

                emp.email
                  .toLowerCase()
                  .includes(search.toLowerCase())

                ||

                emp.department
                  .toLowerCase()
                  .includes(search.toLowerCase())

                ||

                emp.designation
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

            .map((emp)=>(

              <tr
                key={
                  emp.employee_id
                }
              >
                <td>
                  {emp.employee_id}
                </td>

                <td>
                  {emp.employee_name}
                </td>

                <td>
                  {emp.email}
                </td>

                <td>
                  {emp.department}
                </td>

                <td>
                  {emp.designation}
                </td>

                <td>

                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() =>
                      editEmployee(emp)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteEmployee(
                        emp.employee_id
                      )
                    }
                  >
                    Delete
                  </button>

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

export default Employees;


import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import api from "../api/axios";

function Employees() {
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [employees, setEmployees] = useState([]);

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
  }, []);

  const loadEmployees = async () => {

    const res =
      await api.get("/employees");

    setEmployees(
      res.data.employees
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

  await api.delete(
    `/employees/${id}`
  );

  setAlertType("warning");

  setMessage(
    "Employee Deleted Successfully"
  );

  loadEmployees();

  setTimeout(() => {
    setMessage("");
  }, 3000);
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

        <table className="table table-bordered">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {employees.map((emp) => (

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

      </div>
    </>
  );
}

export default Employees;


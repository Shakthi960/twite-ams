import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/theme.css";

function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <nav className="custom-navbar">

      <div className="navbar-header">

        <h2>
          Attendance Management System
        </h2>

        <p>
          Employee Attendance Tracking Dashboard
        </p>

      </div>

      <div className="navbar-links">

        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard"
              ? "active-link"
              : ""
          }
        >
          Dashboard
        </Link>

        <Link
          to="/employees"
          className={
            location.pathname === "/employees"
              ? "active-link"
              : ""
          }
        >
          Employees
        </Link>

        <Link
          to="/attendance"
          className={
            location.pathname === "/attendance"
              ? "active-link"
              : ""
          }
        >
          Attendance
        </Link>

        <button
          onClick={logout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

    </nav>

  );

}

export default Navbar;
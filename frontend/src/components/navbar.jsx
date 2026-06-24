import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <span className="navbar-brand">
          Attendance System
        </span>

        <div className="navbar-nav">
          <Link
            className="nav-link"
            to="/dashboard"
          >
            Dashboard
          </Link>

          <Link
            className="nav-link"
            to="/employees"
          >
            Employees
          </Link>

          <Link
            className="nav-link"
            to="/attendance"
          >
            Attendance
          </Link>

          <button
            className="btn ms-3"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
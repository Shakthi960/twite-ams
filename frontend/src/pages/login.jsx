import { useState } from "react";
import api from "../api/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const login = async () => {
      try {

        const res = await api.post(
          "/login",
          {
            username,
            password
          }
        );

        localStorage.setItem(
          "token",
          res.data.access_token
        );

        setAlertType("success");
        setMessage("Login Successful");

        setTimeout(() => {
          window.location.href =
            "/dashboard";
        }, 1000);

      } catch {

        setAlertType("danger");
        setMessage("Invalid Username or Password");
      }
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 mx-auto"
        style={{ maxWidth: "400px" }}
      >

        {message && (
          <div className={`alert alert-${alertType}`}>
            {message}
          </div>
        )}
        
        <h2 className="mb-3">
          Attendance System
        </h2>

        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;